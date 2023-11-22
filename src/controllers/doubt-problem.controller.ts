import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Doubt,
  Problem,
} from '../models';
import {DoubtRepository} from '../repositories';

export class DoubtProblemController {
  constructor(
    @repository(DoubtRepository)
    public doubtRepository: DoubtRepository,
  ) { }

  @get('/doubts/{id}/problem', {
    responses: {
      '200': {
        description: 'Problem belonging to Doubt',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Problem),
          },
        },
      },
    },
  })
  async getProblem(
    @param.path.string('id') id: typeof Doubt.prototype.id,
  ): Promise<Problem> {
    return this.doubtRepository.problem(id);
  }
}
