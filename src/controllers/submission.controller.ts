// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Roles, SubmissionStatus} from '../keys';
import {Submission} from '../models';
import {ProblemRepository, SubmissionRepository} from '../repositories';

@authenticate("jwt")
export class SubmissionController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile,
    @repository(ProblemRepository)
    private problemRepository: ProblemRepository,
    @repository(SubmissionRepository)
    private submissionsRepository: SubmissionRepository,
  ) { }

  @authorize({allowedRoles: [Roles.ADMIN, Roles.ADVISOR, Roles.STUDENT]})
  @post('/problems/{id}/submissions')
  @response(200, {
    description: 'execution of javascript code'
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: {
              blocksXml: {
                type: 'string'
              }
            },
            required: ['blocksXml']
          }
        }
      }
    })
    body: {blocksXml: string},
    @param.path.string('id') problemId: string,

  ): Promise<any> {
    const problem = await this.problemRepository.findById(problemId, {fields: {id: true}});
    return this.problemRepository.submissions(problemId).create({
      userId: this.user[securityId] as any,
      status: SubmissionStatus.PENDING,
      problemId: problem.id as any,
      blocksXml: body.blocksXml
    })
  }
  @authorize({allowedRoles: [Roles.ADMIN, Roles.ADVISOR, Roles.STUDENT]})
  @get('/submissions')
  @response(200, {
    description: 'users submissions',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Submission)
      }
    }
  })
  async getAll(
    @param.filter(Submission) filter?: Filter<Submission>
  ): Promise<Submission[]> {
    return this.submissionsRepository.find({...filter, where: {...filter?.where, userId: this.user[securityId] as any}})
  }

}
