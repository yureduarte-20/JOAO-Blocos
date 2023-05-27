'strict'
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';

import {securityId, UserProfile} from '@loopback/security';
import {Doubt, DoubtsTags, DoubtStatus, IMessage} from '../models';
import {DoubtRepository, ProblemRepository} from '../repositories';
@authenticate({strategy: 'jwt'})
export class DoubtController {
  constructor(
    @repository(DoubtRepository)
    public doubtRepository: DoubtRepository,
    @inject(AuthenticationBindings.CURRENT_USER)
    private currentUser: UserProfile,
    @repository(ProblemRepository)
    private problemRepository: ProblemRepository
  ) { }

  @post('/doubt/problem/{id}')
  @response(200, {
    description: 'Doubt model instance',
    content: {'application/json': {schema: getModelSchemaRef(Doubt)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: {
              tagDoubt: {
                enum: Object.values(DoubtsTags)
              },
            },
          },
        },
      },
    })
    {tagDoubt}: {tagDoubt?: string},
    @param.path.string('id') problemId: string,
  ): Promise<Doubt> {
    const {count} = await this.doubtRepository.count({
      and: [
        {problemId: problemId},
        {studentId: this.currentUser[securityId]},
        {or: [{status: DoubtStatus.OPEN}, {status: DoubtStatus.ON_GOING}]}
      ],
    });
    if (count > 0) return Promise.reject(new HttpErrors.UnprocessableEntity('Já existe uma conversa em aberta para este problema'))
    const response = await this.problemRepository.findById(problemId)
    return this.doubtRepository.create({
      studentName: this.currentUser.name,
      studentId: this.currentUser.id,
      problemId: problemId,
      problemTitle: response.title,
      tag: tagDoubt
    })
  }


  @post('/doubts/{doubtId}')
  @response(200, {
    description: 'Doubt model instance',
    content: {'application/json': {schema: getModelSchemaRef(Doubt)}},
  })
  async appendMessage(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: {
              message: {
                type: 'string',
              },
            },
            required: ['message']
          }
        },
      },
    })
    message: IMessage,
    @param.path.string('doubtId') doubtId: string
  ): Promise<void> {
    message.userId = this.currentUser[securityId]
    let response = await this.doubtRepository.findOne({
      where: {
        and: [
          {id: doubtId},
          {
            or: [
              {advisorId: message.userId},
              {studentId: message.userId},
            ]
          }
        ],
      }
    })
    if (!response) return Promise.reject(new HttpErrors.NotFound('Conversa não encontrada'));
    if (response.status === DoubtStatus.COMPLETE) return Promise.reject(new HttpErrors.UnprocessableEntity('Conversa encerrada'))
    if (!response.messages)
      response.messages = []
    let date = new Date().toISOString()
    response.messages.push({...message, createdAt: date})
    response.updatedAt = date
    return this.doubtRepository.updateById(doubtId, response);
  }

  @post('/doubts/close/{doubtId}')
  @response(200, {
    description: 'Doubt model instance',
    content: {'application/json': {schema: getModelSchemaRef(Doubt)}},
  })
  async close(
    @param.path.string('doubtId') doubtId: string
  ): Promise<void> {
    const userId = this.currentUser[securityId]
    let response = await this.doubtRepository.findOne({where: {id: doubtId, or: [{advisorId: userId}, {studentId: userId}]}})

    if (!response) return Promise.reject(new HttpErrors.UnprocessableEntity('Conversa não encontrada'))
    if (response.status === DoubtStatus.COMPLETE) return Promise.reject(new HttpErrors.UnprocessableEntity('Conversa já encerrada'))
    response.status = DoubtStatus.COMPLETE
    response.closedAt = new Date().toISOString()
    return this.doubtRepository.updateById(doubtId, response);
  }

  @get('/doubts/count')
  @response(200, {
    description: 'Doubt model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Doubt) where?: Where<Doubt>,
  ): Promise<Count> {
    return this.doubtRepository.count(where);
  }

  @get('/doubts')
  @response(200, {
    description: 'Array of Doubt model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Doubt, {includeRelations: true}),
        },
      },
    },
  })
  async find(

    @param.filter(Doubt) filter?: Filter<Doubt>,
  ): Promise<Doubt[]> {
    const studentId = this.currentUser.id
    if (filter)
      filter.where = {...filter.where, advisorId: undefined, studentId: undefined};
    return this.doubtRepository.find({
      ...filter, where: {
        ...filter?.where,
        studentId: studentId
      }
    });
  }
  @get('/doubts/{id}')
  @response(200, {
    description: 'Doubt model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Doubt, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Doubt) filter?: Filter<Doubt>
  ): Promise<Doubt> {
    const userId = this.currentUser[securityId]
    if (filter)
      filter.where = {...filter.where, advisorId: undefined, studentId: undefined};
    const doubt = await this.doubtRepository.findOne({
      ...filter, where: {
        ...filter?.where,
        and: [
          {id},
          {
            or: [
              {studentId: userId}
            ]
          }
        ],
      }
    });
    if (!doubt) return Promise.reject(new HttpErrors.NotFound('Conversa não encontrada'))
    return doubt
  }
}
