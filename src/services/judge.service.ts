import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {execSync} from 'child_process';
import {unlink, writeFileSync} from 'fs';
import cron, {ScheduledTask} from 'node-cron';
import {DockerServiceBindings, SubmissionStatus} from '../keys';
import {Issue, Language, Submission} from '../models';
import {IssueRepository, LanguageRepository, SubmissionRepository} from '../repositories';
import {DockerService} from './docker.service';

export class TimeOutError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "Timeout Error"
  }
}
export interface JudgeBootstraper {
  boot(cron_interval_time?: number): void;
  destroy(): void;
}
export class JudgeService implements JudgeBootstraper {
  private readonly path: string;
  private task: ScheduledTask;
  private languageCaches: Language[] = [];
  private issueCaches: Issue[] = [];
  private MAX_SIMULTANEOUS_EXECUTIONS = 5;
  public avaliable: boolean = true;
  private prefixJavascript = (args?: string[]) => `
  let _args_variables = '${args?.join(',')}';
  _args_variables = _args_variables.split(',').map(item => isNaN(Number(item)) ? (item[0] === ":" ? item.slice(1) : item  ) : Number(item))
  let __argsIndex = 0;
  const window = {
    alert:(...msg ) => console.log(...msg),
    prompt:(...args) => _args_variables[__argsIndex++]
  };

  `;
  constructor(
    @repository('LanguageRepository')
    private languageRepository: LanguageRepository,
    @repository('SubmissionRepository')
    private submissionsRepository: SubmissionRepository,
    @inject(DockerServiceBindings.DOCKER)
    private dockerService: DockerService,
    @repository('IssueRepository')
    private issueRepository: IssueRepository,
  ) {
    this.path = execSync("pwd").toString().trim()
  }
  boot(): void {
    this.task = cron.getTasks()[0] ?? cron.schedule('*/10 * * * * *', () => {
      if (this.avaliable) {
        this.avaliable = false;
        this.routine(() => {
          this.avaliable = true;
        });
      }
    })

  }
  destroy(): void {
    this.task.stop();
  }
  private getAllPendingSubmissions(): Promise<Submission[]> {
    return this.submissionsRepository.find({where: {status: SubmissionStatus.PENDING}, limit: this.MAX_SIMULTANEOUS_EXECUTIONS})
  }
  private async getLanguage(languageId: string): Promise<Language> {
    this.languageCaches.forEach(element => {
      if (element.id === languageId) {
        return element;
      }
    });

    let newLanguage = await this.languageRepository.findById(languageId);
    this.languageCaches.push(newLanguage)
    return newLanguage

  }
  private async getIssue(issueId: string) {
    for (let element of this.issueCaches) {
      if (element.id === issueId) {
        return element;
      }
    }
    let newIssue = await this.issueRepository.findById(issueId);
    this.issueCaches.push(newIssue)
    return newIssue

  }
  private async routine(callback?: (err: Error | null) => void) {
    const submissions = await this.getAllPendingSubmissions()
    if (!submissions) {callback && callback(null); return;}
    const promisses = [];
    for (const submission of submissions) {
      promisses.push(this.handleSubmission(submission))
    }
    try {
      await Promise.allSettled(promisses);
      callback && callback(null)
    } catch (e) {
      callback && callback(e)
    }
  }
  private createTmpScript(basePath: string, fileName: string, data: string) {
    writeFileSync(`${basePath}/${fileName}`, data)

  }
  private deleteTmpScript(basePath: string, fileName: string) {
    unlink(`${basePath}/${fileName}`, (err) => {
      if (err) console.log(`Falhou em deletar ${fileName}`)
    })
  }
  private changeSubmission(submission: Submission): Promise<void> {
    return this.submissionsRepository.update(submission)
  }
  private handleOutput(output: string, issue: Issue) {
    return output === issue.expectedOutput;
  }
  async handleSubmission(submission: Submission) {
    let issue = await this.getIssue(submission.issueId)
    let language = await this.getLanguage(submission.languageId)
    const basePath = this.path + '/src/tmp/javascriptsCode';
    const fileName = `${submission.userId}.js`;
    const container_name = `${submission.id}-${language.name}`;
    const code = this.prefixJavascript(issue.args).concat(submission.code);
    const dockerImage = language.dockerTagVersion
    this.createTmpScript(basePath, fileName, code)
    try {
      const output = await this.dockerService.executeContainer(dockerImage, basePath, fileName, container_name)
      this.handleOutput(output, issue) ?
        submission.status = SubmissionStatus.ACCEPTED :
        submission.status = SubmissionStatus.PRESENTATION_ERROR
    } catch (err) {
      err instanceof TimeOutError ?
        submission.status = SubmissionStatus.TIME_LIMIT_EXCEEDED :
        submission.status = SubmissionStatus.RUNTIME_ERROR
      submission.error = JSON.stringify({message: err.message, name: err.name, stack: err.stack})
    } finally {
      this.deleteTmpScript(basePath, fileName);
      await this.changeSubmission(submission)
    }
  }
}
