import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Problem,
  Doubt,
} from '../models';
import {ProblemRepository} from '../repositories';

export class ProblemDoubtController {
  constructor(
    @repository(ProblemRepository) protected problemRepository: ProblemRepository,
  ) { }

  @get('/problems/{id}/doubts', {
    responses: {
      '200': {
        description: 'Array of Problem has many Doubt',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Doubt)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Doubt>,
  ): Promise<Doubt[]> {
    return this.problemRepository.doubts(id).find(filter);
  }

  @post('/problems/{id}/doubts', {
    responses: {
      '200': {
        description: 'Problem model instance',
        content: {'application/json': {schema: getModelSchemaRef(Doubt)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Problem.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doubt, {
            title: 'NewDoubtInProblem',
            exclude: ['id'],
            optional: ['problemId']
          }),
        },
      },
    }) doubt: Omit<Doubt, 'id'>,
  ): Promise<Doubt> {
    return this.problemRepository.doubts(id).create(doubt);
  }

  @patch('/problems/{id}/doubts', {
    responses: {
      '200': {
        description: 'Problem.Doubt PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doubt, {partial: true}),
        },
      },
    })
    doubt: Partial<Doubt>,
    @param.query.object('where', getWhereSchemaFor(Doubt)) where?: Where<Doubt>,
  ): Promise<Count> {
    return this.problemRepository.doubts(id).patch(doubt, where);
  }

  @del('/problems/{id}/doubts', {
    responses: {
      '200': {
        description: 'Problem.Doubt DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Doubt)) where?: Where<Doubt>,
  ): Promise<Count> {
    return this.problemRepository.doubts(id).delete(where);
  }
}
