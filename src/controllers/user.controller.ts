import {authenticate, TokenService} from '@loopback/authentication';
import {
  TokenServiceBindings, UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, HttpErrors, post, requestBody, response} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {User} from '../models';
import {UserRepository} from '../repositories/index';
import {MyUserService} from '../services/user.service';
import {Credentials} from '../types';
export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository)
    protected userRepository: UserRepository,
  ) {
  }

  @post('/login')
  @response(200, {content: {'application/json': {schema: {properties: {token: {type: 'string'}}}}}})
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: {
              email: {
                type: "string",
                required: ["email"]
              },
              password: {
                type: "string",
                required: ['password']
              }
            }
          },
        }
      }
    })
    credentials: Credentials
  ): Promise<any> {
    let user = await this.userRepository.findOne({
      where: {
        email: credentials.email
      }
    })
    if (!user) return Promise.reject(new HttpErrors.NotFound('Usuário não encontrado'))
    const valid = await this.userService.hasher.comparePassword(credentials.password, user.password)
    if (!valid) return Promise.reject(new HttpErrors.UnprocessableEntity("Senha incorreta."))
    let userProfile = this.userService.convertToUserProfile(user);
    let token = await this.jwtService.generateToken(userProfile);

    return Promise.resolve({token})
  }

  @post('/signup')
  @response(200, {
    content: {
      'application/json': {
        schema: getModelSchemaRef(User)
      }
    }
  })
  async signup(
    @requestBody({
      content: {
        'application/json': getModelSchemaRef(User, {
          title: 'NewUser',
          exclude: ['id']
        })
      },
    })
    newUser: Omit<User, 'id'>
  ) {
    let finded = await this.userRepository.findOne({
      where: {
        email: newUser.email
      }
    })
    if (finded) return Promise.reject(new HttpErrors.UnprocessableEntity("Usuário com email já cadastrado."))
    let password_hashed = await this.userService.hasher.hashPassword(newUser.password);
    return this.userRepository.create({...newUser, password: password_hashed})
  }
  @authenticate("jwt")
  @get('/profile')
  @response(200, {
    content: {
      'application/json': {
        schema: getModelSchemaRef(User)
      }
    }
  })
  async profile() {
    console.log(this.user)
    return this.userRepository.findOne({where: {id: this.user[securityId]}})
  }
}
