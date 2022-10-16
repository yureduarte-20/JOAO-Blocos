import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Roles} from '../keys';
import {Issue} from '../models';
import {IssueRepository} from '../repositories';
@authenticate("jwt")
@authorize({allowedRoles: [Roles.ADMIN, Roles.COLLABORATOR, Roles.CONSUMER]})
export class IssueController {
  constructor(
    @repository(IssueRepository)
    public issueRepository: IssueRepository,
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile
  ) { }


  @get('/issues/count')
  @response(200, {
    description: 'Issue model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Issue) where?: Where<Issue>,
  ): Promise<Count> {
    return this.issueRepository.count(where);
  }

  @get('/issues')
  @response(200, {
    description: 'Array of Issue model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Issue, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Issue) filter?: Filter<Issue>,
    @param.query.boolean('withSubmissions') withSubmissions?: boolean
  ): Promise<Issue[]> {

    if (!withSubmissions) {
      return this.issueRepository.find({...filter, include: undefined})
    }
    return this.issueRepository.find({
      ...filter,
      fields: {testCases: false},
      include: [{
        relation: 'submissions',
        scope: {
          where: {and: [{userId: this.user[securityId]}]}
        }
      }]
    })


  }


  @get('/issues/{id}')
  @response(200, {
    description: 'Issue model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Issue, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Issue, {exclude: 'where'}) filter?: FilterExcludingWhere<Issue>
  ): Promise<Issue> {
    return this.issueRepository.findById(id, {...filter, fields: {testCases: false}});
  }

}
