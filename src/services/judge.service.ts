import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import Blockly from 'blockly';
import {execSync} from 'child_process';
import {unlink, writeFileSync} from 'fs';
import cron, {ScheduledTask} from 'node-cron';
import {DockerServiceBindings, NodeJSBindings, SubmissionStatus} from '../keys';
import {Issue, Language, Submission} from '../models';
import {IssueRepository, LanguageRepository, SubmissionRepository} from '../repositories';
import {javascriptPrefix} from '../utils/javascriptScript';
import {DockerService} from './docker.service';
import NodeJSService from './nodejs.service';
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
  private readonly absolutePath: string;
  private task: ScheduledTask;
  private languageCaches: Language[] = [];
  private issueCaches: Issue[] = [];
  private MAX_SIMULTANEOUS_EXECUTIONS = 5;
  public avaliable: boolean = true;
  constructor(
    @repository('LanguageRepository')
    private languageRepository: LanguageRepository,
    @repository('SubmissionRepository')
    private submissionsRepository: SubmissionRepository,
    @inject(DockerServiceBindings.DOCKER)
    private dockerService: DockerService,
    @repository('IssueRepository')
    private issueRepository: IssueRepository,
    @inject(NodeJSBindings.NODE_JS_SERVICE)
    private nodeJSService: NodeJSService
  ) {
    this.absolutePath = execSync("pwd").toString().trim()
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
  private async getLanguage(languageId: typeof Language.prototype.id): Promise<Language> {
    this.languageCaches.forEach(element => {
      if (element.id === languageId) {
        return element;
      }
    });

    let newLanguage = await this.languageRepository.findById(languageId);
    this.languageCaches.push(newLanguage)
    return newLanguage

  }

  private xmlToCode(xmlText: string) {
    let xml = Blockly.Xml.textToDom(xmlText)
    var workspace = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(xml, workspace);
    return Blockly.JavaScript.workspaceToCode(workspace);
  }
  private async getIssue(issueId: typeof Issue.prototype.id) {
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
    try {
      let response = JSON.parse(output);
      console.log(response)
      return response.output_as_string == issue.expectedOutput
    } catch (e) {

      return output === issue.expectedOutput;
    }
  }


  async handleSubmission(submission: Submission) {
    let issue = await this.getIssue(submission.issueId)
    const basePath = this.absolutePath + '/src/tmp/javascriptsCode';
    const fileName = `${submission.id}.js`;
    const code = javascriptPrefix.concat(this.xmlToCode(submission.blocksXml));
    this.createTmpScript(basePath, fileName, code)
    try {
      const output = await this.nodeJSService.execute({fileName, basePath}, issue.args)
      this.handleOutput(output, issue) ?
        submission.status = SubmissionStatus.ACCEPTED :
        submission.status = SubmissionStatus.PRESENTATION_ERROR
    } catch (err) {
      console.log(err.name)
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
