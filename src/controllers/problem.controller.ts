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
import {Problem} from '../models';
import {ProblemRepository} from '../repositories';
@authenticate("jwt")
@authorize({allowedRoles: [Roles.ADMIN, Roles.ADVISOR, Roles.STUDENT]})
export class ProblemController {
  constructor(
    @repository(ProblemRepository)
    public problemRepository: ProblemRepository,
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile
  ) { }


  @get('/problems/count')
  @response(200, {
    description: 'Issue model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Problem) where?: Where<Problem>,
  ): Promise<Count> {
    return this.problemRepository.count(where);
  }

  @get('/problems')
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
  ): Promise<Problem[]> {

    if (!withSubmissions) {
      return this.problemRepository.find({...filter, include: undefined, fields: {...filter?.fields, testCases: false}})
    }
    return this.problemRepository.find({
      ...filter,
      fields: {...filter?.fields, testCases: false},
      include: [{
        relation: 'submissions',
        scope: {
          where: {and: [{userId: this.user[securityId]}]}
        }
      }]
    })


  }


  @get('/problems/{id}')
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
    return this.problemRepository.findById(id, {...filter, fields: {...filter?.fields, testCases: false}});
  }

}
