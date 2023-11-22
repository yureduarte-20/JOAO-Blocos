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
import {Problem, ProblemRelations} from '../models';
import {ProblemRepository, SubmissionRepository} from '../repositories';
interface Solved {
  solved: boolean
}
type ProblemSolved = Problem & ProblemRelations & Solved;
@authenticate('jwt')
@authorize({allowedRoles: [Roles.ADMIN]})
export class ProblemAdminController {
  constructor(
    @repository(ProblemRepository)
    public problemRepository: ProblemRepository,
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile,
    @repository('SubmissionRepository')
    private submissionRepository: SubmissionRepository
  ) { }
  @post('/admin/problems')
  @response(200, {
    description: 'Issue model instance',
    content: {'application/json': {schema: getModelSchemaRef(Problem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Problem, {
            title: 'NewIssue',
            exclude: ['id'],
          }),
        },
      },
    })
    issue: Omit<Problem, 'id'>,
  ): Promise<Problem> {
    return this.problemRepository.create(issue);
  }
  @get('/admin/problems/count')
  @response(200, {
    description: 'Issue model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Problem) where?: Where<Problem>,
  ): Promise<Count> {
    return this.problemRepository.count(where);
  }
  @get('/admin/problems')
  @response(200, {
    description: 'Array of Issue model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Problem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Problem) filter?: Filter<Problem>,
    @param.query.boolean('withSubmissions') withSubmissions?: boolean
  ): Promise<Problem[] | ProblemSolved[]> {

    if (!withSubmissions) {
      return this.problemRepository.find({...filter, include: undefined})
    }
    const problems = await this.problemRepository.find({
      ...filter,
      include: [{
        relation: 'submissions',
        scope: {
          where: {and: [{userId: this.user[securityId]}]}
        }
      }]
    })

    return problems;
  }
  @patch('/admin/problems')
  @response(200, {
    description: 'Issue PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Problem, {partial: true}),
        },
      },
    })
    issue: Problem,
    @param.where(Problem) where?: Where<Problem>,
  ): Promise<Count> {
    return this.problemRepository.updateAll(issue, where);
  }
  @get('/admin/problems/{id}')
  @response(200, {
    description: 'Issue model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Problem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Problem, {exclude: 'where'}) filter?: FilterExcludingWhere<Problem>
  ): Promise<Problem> {
    return this.problemRepository.findById(id, filter);
  }
  @patch('/admin/problems/{id}')
  @response(204, {
    description: 'Issue PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Problem, {partial: true}),
        },
      },
    })
    issue: Problem,
  ): Promise<void> {
    await this.problemRepository.updateById(id, issue);
  }
  @put('/admin/problems/{id}')
  @response(204, {
    description: 'Issue PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() issue: Problem,
  ): Promise<void> {
    await this.problemRepository.replaceById(id, issue);
  }
  @del('/admin/problems/{id}')
  @response(204, {
    description: 'Issue DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.problemRepository.deleteById(id);
  }
}
