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
@authorize({allowedRoles: [Roles.ADMIN]})
export class IssueAdminController {
  constructor(
    @repository(IssueRepository)
    public issueRepository: IssueRepository,
  ) { }

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

  @get('/admin-issues/count')
  @response(200, {
    description: 'Issue model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Issue) where?: Where<Issue>,
  ): Promise<Count> {
    return this.issueRepository.count(where);
  }

  @get('/admin-issues')
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

  @get('/admin-issues/{id}')
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

  @del('/admin-issues/{id}')
  @response(204, {
    description: 'Issue DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.issueRepository.deleteById(id);
  }
}
