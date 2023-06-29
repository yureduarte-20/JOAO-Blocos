import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
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
import {securityId, UserProfile} from '@loopback/security';
import {
  Draft
} from '../models';
import {UserRepository} from '../repositories';
@authenticate({strategy: 'jwt'})
export class UserDraftController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @inject(AuthenticationBindings.CURRENT_USER)
    private currentUser: UserProfile,
  ) { }

  @get('/users/drafts', {
    responses: {
      '200': {
        description: 'Array of User has many Draft',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Draft)},
          },
        },
      },
    },
  })
  async find(

    @param.query.object('filter') filter?: Filter<Draft>,
  ): Promise<Draft[]> {
    return this.userRepository.drafts(this.currentUser[securityId]).find(filter);
  }

  @post('/users/drafts', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Draft)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Draft, {
            title: 'Novo rascunho de blocos de usuários',
            exclude: ['id', 'userId'],
          }),
        },
      },
    }) draft: Omit<Draft, 'id'>,
  ): Promise<Draft> {
    delete draft.createdAt, draft.updatedAt;
    return this.userRepository.drafts(this.currentUser[securityId]).create(draft);
  }

  @patch('/users/drafts', {
    responses: {
      '200': {
        description: 'User.Draft PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Draft, {partial: true, exclude: ['userId']}),
        },
      },
    })
    draft: Partial<Draft>,
    @param.query.object('where', getWhereSchemaFor(Draft)) where?: Where<Draft>,
  ): Promise<Count> {
    draft.updatedAt = new Date().toISOString()
    return this.userRepository.drafts(this.currentUser[securityId]).patch(draft, where);
  }

  @del('/users/drafts', {
    responses: {
      '200': {
        description: 'User.Draft DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.query.object('where', getWhereSchemaFor(Draft)) where?: Where<Draft>,
  ): Promise<Count> {
    return this.userRepository.drafts(this.currentUser[securityId]).delete(where);
  }
}
