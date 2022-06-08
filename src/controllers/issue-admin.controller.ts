import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
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
import {Roles} from '../keys';
import {Issue} from '../models';
import {IssueRepository} from '../repositories';
@authenticate('jwt')

export class IssueAdminController {
  constructor(
    @repository(IssueRepository)
    public issueRepository: IssueRepository,
  ) { }
  @authorize({allowedRoles: [Roles.ADMIN]})
  @post('/admin-issues')
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
  @authorize({allowedRoles: [Roles.ADMIN, Roles.COLLABORATOR, Roles.CONSUMER]})
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
  @authorize({allowedRoles: [Roles.ADMIN, Roles.COLLABORATOR, Roles.CONSUMER]})
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
  ): Promise<Issue[]> {
    return this.issueRepository.find(filter);
  }
  @authorize({allowedRoles: [Roles.ADMIN]})
  @patch('/admin-issues')
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
  @authorize({allowedRoles: [Roles.ADMIN, Roles.COLLABORATOR, Roles.CONSUMER]})
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
    @param.path.number('id') id: number,
    @param.filter(Issue, {exclude: 'where'}) filter?: FilterExcludingWhere<Issue>
  ): Promise<Issue> {
    return this.issueRepository.findById(id, filter);
  }
  @authorize({allowedRoles: [Roles.ADMIN]})
  @patch('/admin-issues/{id}')
  @response(204, {
    description: 'Issue PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
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
  @authorize({allowedRoles: [Roles.ADMIN]})
  @put('/admin-issues/{id}')
  @response(204, {
    description: 'Issue PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() issue: Issue,
  ): Promise<void> {
    await this.issueRepository.replaceById(id, issue);
  }
  @authorize({allowedRoles: [Roles.ADMIN]})
  @del('/admin-issues/{id}')
  @response(204, {
    description: 'Issue DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.issueRepository.deleteById(id);
  }
}
