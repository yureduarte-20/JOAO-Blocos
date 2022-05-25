// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {get, param, post, requestBody, response} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Roles, SubmissionStatus} from '../keys';
import {Submission} from '../models';
import {IssueRepository, LanguageRepository, SubmissionRepository} from '../repositories';

@authenticate("jwt")
export class SubmissionController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile,
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
                type: 'number'
              },
              blocksXml: {
                type: 'string'
              },
              issueId: {
                type: 'number',
              }
            }
          }
        }
      }
    })
    body: {code: string, languageId: number, blocksXml?: string, issueId: number},


  ): Promise<any> {

    const issue = await this.issueRepository.findById(body.issueId, {fields: {id: true}});
    const language = await this.languageRepository.findById(body.languageId, {fields: {id: true}})
    return this.submissionsRepository.create({
      userId: parseInt(this.user[securityId]),
      status: SubmissionStatus.PENDING,
      issueId: issue.id,
      code: body.code,
      languageId: language.id,
      blocksXml: body.blocksXml
    });
  }
  @authorize({allowedRoles: [Roles.ADMIN, Roles.COLLABORATOR, Roles.CONSUMER]})
  @get('/submissions')
  @response(200, {
    description: 'users submissions'
  })
  async getAll(
    @param.filter(Submission) filter?: Filter<Submission>
  ): Promise<Submission[]> {
    return this.submissionsRepository.find({...filter, where: {...filter?.where, userId: parseInt(this.user[securityId])}})
  }
}
