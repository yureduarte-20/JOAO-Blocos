import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import Blockly from 'blockly';
import {execSync} from 'child_process';
import {unlink, writeFileSync} from 'fs';
import cron, {ScheduledTask} from 'node-cron';
import {DockerServiceBindings, NodeJSBindings, SubmissionStatus} from '../keys';
import {Issue, ITestCase, Submission} from '../models';
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
  private MAX_SIMULTANEOUS_EXECUTIONS = Number(process.env.MAX_SIMULTANEOUS_EXECUTIONS) || 5;
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

  private xmlToCode(xmlText: string) {
    let xml = Blockly.Xml.textToDom(xmlText)
    var workspace = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(xml, workspace);
    return Blockly.JavaScript.workspaceToCode(workspace);
  }
  private async getIssue(issueId: typeof Issue.prototype.id) {
    return await this.issueRepository.findById(issueId);
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


  private handleOutput({output, testCase}: {output: string, testCase: ITestCase}) {

    if (output == testCase.outputs) {
      return SubmissionStatus.ACCEPTED
    }
    if (testCase.validationOutputRegex) {
      const regex = new RegExp(testCase.validationOutputRegex);
      if (!regex.test(output)) {
        return SubmissionStatus.PRESENTATION_ERROR
      }

    }
    return SubmissionStatus.WRONG_ANSWER

  }//444803134
  //2054948743

  private async handleTestCase({issue, submission}: {issue: Issue, submission: Submission}) {
    const testCases = issue.testCases
    for (let testCaseIndex = 0; testCaseIndex < testCases.length; testCaseIndex++) {
      const basePath = this.absolutePath + '/src/tmp/javascriptsCode';
      const fileName = `${submission.id}-${testCaseIndex}.js`;
      const code = javascriptPrefix.concat(this.xmlToCode(submission.blocksXml));
      this.createTmpScript(basePath, fileName, code)
      try {
        let output: any = await this.nodeJSService.execute({basePath, fileName}, testCases[testCaseIndex].inputs);
        output = JSON.parse(output)
        const answer = this.handleOutput({output: output.output_as_string, testCase: testCases[testCaseIndex]})
        if (!submission.results)
          submission.results = []
        submission.results.push(answer);
        this.deleteTmpScript(basePath, fileName);
      } catch (e) {
        throw e
      }
    }
  }
  async handleSubmission(submission: Submission) {
    let issue = await this.getIssue(submission.issueId);
    try {
      await this.handleTestCase({issue, submission});
      if (submission.results?.every((v) => v == SubmissionStatus.ACCEPTED)) {
        submission.status = SubmissionStatus.ACCEPTED
      } else if (submission.results?.some(el => el == SubmissionStatus.PRESENTATION_ERROR)) {
        submission.status = SubmissionStatus.PRESENTATION_ERROR
      } else {
        let count = 0
        submission.status = SubmissionStatus.WRONG_ANSWER
        if (submission.results) {
          submission.results?.forEach(v => {
            if (v == SubmissionStatus.ACCEPTED) count++;
          })
          submission.successfulRate = Number((count / submission.results.length).toFixed(2));
        }
      }
    } catch (err) {
      console.log(err.name)
      err instanceof TimeOutError ?
        submission.status = SubmissionStatus.TIME_LIMIT_EXCEEDED :
        submission.status = SubmissionStatus.RUNTIME_ERROR
      submission.error = JSON.stringify({message: err.message, name: err.name, stack: err.stack})
    } finally {
      //  this.deleteTmpScript(basePath, fileName);
      await this.changeSubmission(submission)
    }
  }
}
