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
import {Submission} from '../models';
import {SubmissionRepository} from '../repositories';
@authenticate("jwt")
@authorize({allowedRoles: [Roles.ADMIN]})
export class SubmissionAdminController {
  constructor(
    @repository(SubmissionRepository)
    public submissionRepository: SubmissionRepository,
  ) { }

  @post('/admin-submission')
  @response(200, {
    description: 'Submission model instance',
    content: {'application/json': {schema: getModelSchemaRef(Submission)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Submission, {
            title: 'NewSubmission',
            exclude: ['id'],
          }),
        },
      },
    })
    submission: Omit<Submission, 'id'>,
  ): Promise<Submission> {
    return this.submissionRepository.create(submission);
  }

  @get('/admin-submission/count')
  @response(200, {
    description: 'Submission model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Submission) where?: Where<Submission>,
  ): Promise<Count> {
    return this.submissionRepository.count(where);
  }

  @get('/admin-submission')
  @response(200, {
    description: 'Array of Submission model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Submission, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Submission) filter?: Filter<Submission>,
  ): Promise<Submission[]> {
    return this.submissionRepository.find(filter);
  }

  @patch('/admin-submission')
  @response(200, {
    description: 'Submission PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Submission, {partial: true}),
        },
      },
    })
    submission: Submission,
    @param.where(Submission) where?: Where<Submission>,
  ): Promise<Count> {
    return this.submissionRepository.updateAll(submission, where);
  }

  @get('/admin-submission/{id}')
  @response(200, {
    description: 'Submission model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Submission, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Submission, {exclude: 'where'}) filter?: FilterExcludingWhere<Submission>
  ): Promise<Submission> {
    return this.submissionRepository.findById(id, filter);
  }

  @patch('/admin-submission/{id}')
  @response(204, {
    description: 'Submission PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Submission, {partial: true}),
        },
      },
    })
    submission: Submission,
  ): Promise<void> {
    await this.submissionRepository.updateById(id, submission);
  }

  @put('/admin-submission/{id}')
  @response(204, {
    description: 'Submission PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() submission: Submission,
  ): Promise<void> {
    await this.submissionRepository.replaceById(id, submission);
  }

  @del('/admin-submission/{id}')
  @response(204, {
    description: 'Submission DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.submissionRepository.deleteById(id);
  }

}
