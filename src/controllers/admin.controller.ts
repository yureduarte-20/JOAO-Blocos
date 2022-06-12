//import {authenticate} from '@loopback/authentication';
//import {authorize} from '@loopback/authorization';
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
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  Response,
  response,
  RestBindings
} from '@loopback/rest';
import {execFileSync} from 'child_process';
import {UserServiceBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {MyUserService} from '../services/user.service';
//@authenticate("jwt")
//@authorize({allowedRoles: [Roles.ADMIN]})
export class AdminController {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
  ) { }

  @post('/admin')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    newUser: Omit<User, 'id'>,
  ): Promise<User> {
    let finded = await this.userRepository.findOne({
      where: {
        email: newUser.email
      }
    })
    if (finded) return Promise.reject(new HttpErrors.UnprocessableEntity("Usuário com email já cadastrado."))
    let password_hashed = await this.userService.hasher.hashPassword(newUser.password);
    return this.userRepository.create({...newUser, password: password_hashed})
  }

  @get('/admin/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/admin')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/admin')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/admin/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/admin/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/admin/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/admin/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
  @get('/admin/files/download/db')
  async download(): Promise<any> {
    const absPath = execFileSync('pwd').toString().trimEnd();
    const filepath = absPath + '/src/datasources/db.json';
    // @todo set headers for content type, length and caching
    return await new Promise<void>((resolve, reject) => {

      this.response.download(filepath, (err: any) => {
        if (err) return reject();
        return resolve();
      })
    })
  }

}
