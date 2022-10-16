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
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Roles} from '../keys';
import {Issue, IssueRelations} from '../models';
import {IssueRepository, SubmissionRepository} from '../repositories';
interface Solved {
  solved: boolean
}
type IssueSolved = Issue & IssueRelations & Solved;
@authenticate('jwt')
@authorize({allowedRoles: [Roles.ADMIN]})
export class IssueAdminController {
  constructor(
    @repository(IssueRepository)
    public issueRepository: IssueRepository,
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile,
    @repository('SubmissionRepository')
    private submissionRepository: SubmissionRepository
  ) { }
  @post('/admin/issues')
  @response(200, {
    description: 'Issue model instance',
    content: {'application/json': {schema: getModelSchemaRef(Issue)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {
            title: 'NewIssue',
            exclude: ['id'],
          }),
        },
      },
    })
    issue: Omit<Issue, 'id'>,
  ): Promise<Issue> {
    return this.issueRepository.create(issue);
  }
  @get('/admin/issues/count')
  @response(200, {
    description: 'Issue model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Issue) where?: Where<Issue>,
  ): Promise<Count> {
    return this.issueRepository.count(where);
  }
  @get('/admin/issues')
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
  ): Promise<Issue[] | IssueSolved[]> {

    if (!withSubmissions) {
      return this.issueRepository.find({...filter, include: undefined})
    }
    const issues = await this.issueRepository.find({
      ...filter,
      include: [{
        relation: 'submissions',
        scope: {
          where: {and: [{userId: this.user[securityId]}]}
        }
      }]
    })

    return issues;
  }
  @patch('/admin/issues')
  @response(200, {
    description: 'Issue PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {partial: true}),
        },
      },
    })
    issue: Issue,
    @param.where(Issue) where?: Where<Issue>,
  ): Promise<Count> {
    return this.issueRepository.updateAll(issue, where);
  }
  @get('/admin/issues/{id}')
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
    return this.issueRepository.findById(id, filter);
  }
  @patch('/admin/issues/{id}')
  @response(204, {
    description: 'Issue PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {partial: true}),
        },
      },
    })
    issue: Issue,
  ): Promise<void> {
    await this.issueRepository.updateById(id, issue);
  }
  @put('/admin/issues/{id}')
  @response(204, {
    description: 'Issue PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() issue: Issue,
  ): Promise<void> {
    await this.issueRepository.replaceById(id, issue);
  }
  @del('/admin/issues/{id}')
  @response(204, {
    description: 'Issue DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.issueRepository.deleteById(id);
  }
}
