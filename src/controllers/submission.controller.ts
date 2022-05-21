// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody, response} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {JudgeServiceBindings, Roles, SubmissionStatus} from '../keys';
import {Submission} from '../models';
import {IssueRepository, LanguageRepository, SubmissionRepository} from '../repositories';
import {JudgeService} from '../services/judge.service';

class RuntimeHttpError extends HttpErrors.UnprocessableEntity {
  constructor(message: string, details: any) {
    super(message);
    this.name = "runtime_error"
    this.details = details
  }
}
class PresentationHttpError extends HttpErrors.UnprocessableEntity {
  constructor(message: string, details: any) {
    super(message);
    this.name = "presentation_error"
    this.details = details
  }
}
class TimeoutHttpError extends HttpErrors.UnprocessableEntity {
  constructor(message: string, details: any) {
    super(message);
    this.name = "timeout_error"
    this.details = details
  }
}

@authenticate("jwt")
export class SubmissionController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile,
    @inject(JudgeServiceBindings.JUDGE)
    private judgeService: JudgeService,
    @repository('IssueRepository')
    private issueRepository: IssueRepository,
    @repository('SubmissionRepository')
    private submissionsRepository: SubmissionRepository,
    @repository('LanguageRepository')
    private languageRepository: LanguageRepository
  ) { }

  @authorize({allowedRoles: [Roles.ADMIN, Roles.COLLABORATOR, Roles.CONSUMER]})
  @post('/submission')
  @response(200, {
    description: 'execution of javascript code'
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: {
              code: {
                type: 'string'
              },
              languageId: {
                type: 'string'
              },
              blocksXml: {
                type: 'string'
              },
              issueId: {
                type: 'string',
              }
            }
          }
        }
      }
    })
    body: {code: string, languageId: string, blocksXml?: string, issueId: string},


  ): Promise<any> {

    const issue = await this.issueRepository.findById(body.issueId, {fields: {id: true}});
    const language = await this.languageRepository.findById(body.languageId, {fields: {id: true}})
    const submission = new Submission({
      userId: this.user[securityId],
      status: SubmissionStatus.PENDING,
      issueId: issue.id,
      code: body.code,
      languageId: language.id,
      blocksXml: body.blocksXml
    })
    return this.submissionsRepository.create(submission);
    /* try {
      const output = await this.judgeService.execute(body.languageId, body.code, issue.args)
      if (issue.expectedOutput === output) {
        await this.submissionsRepository.create({
          code: body.code,
          issueId: issue.id,
          languageId: body.languageId,
          userId: this.user[securityId],
          status: SubmissionStatus.ACCEPTED,
          blocksXml: body.blocksXml
        })
        return Promise.resolve({
          status: 'ok',
          output: output
        })
      } else {
        await this.submissionsRepository.create({
          code: body.code,
          issueId: issue.id,
          languageId: body.languageId,
          userId: this.user[securityId],
          status: SubmissionStatus.PRESENTATION_ERROR,
          blocksXml: body.blocksXml
        })
        return Promise.reject(new PresentationHttpError("Saída não condiz com a proposta pelo exercício", {
          error: {
            output: output,
          }
        }))
      }
    } catch (e) {
      //console.log(e)
      if (e instanceof Error && e.name == "Timeout Error") {
        await this.submissionsRepository.create({
          code: body.code,
          issueId: issue.id,
          languageId: body.languageId,
          userId: this.user[securityId],
          status: SubmissionStatus.TIME_LIMIT_EXCEEDED,
          blocksXml: body.blocksXml
        })
        return Promise.reject(new TimeoutHttpError(e.message, {
          error: {
            output: null
          }
        }))
      }
      await this.submissionsRepository.create({
        code: body.code,
        issueId: issue.id,
        languageId: body.languageId,
        userId: this.user[securityId],
        status: SubmissionStatus.RUNTIME_ERROR,
        blocksXml: body.blocksXml
      })
      return Promise.reject(new RuntimeHttpError("O arquivo não pode ser compilado corretamente, verifique o código e submeta novemante.", {
        error: {
          stack: e.toString(),
        }
      }))
    }
    */
  }
  @authorize({allowedRoles: [Roles.ADMIN, Roles.COLLABORATOR, Roles.CONSUMER]})
  @get('/submissions')
  @response(200, {
    description: 'users submissions'
  })
  async getAll(
    @param.filter(Submission) filter?: Filter<Submission>
  ): Promise<Submission[]> {
    return this.submissionsRepository.find({...filter, where: {...filter?.where, userId: this.user[securityId]}})
  }
}
