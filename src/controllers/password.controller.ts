// Uncomment these imports to begin using these cool features!

import {AuthenticationBindings, authenticate} from '@loopback/authentication';

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody, response} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {UserRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password';


// import {inject} from '@loopback/core';

@authenticate({strategy: 'jwt'})
export class PasswordController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) private hasher: BcryptHasher
  ) { }

  @post('/password-reset')
  @response(204, {
    description: 'Resposta de atualização da troca de senha'
  })
  public async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: {
              oldPassword: {
                type: 'string'
              },
              newPassword: {
                type: 'string'
              },
              newPasswordConfirmation: {
                type: 'string'
              }
            },
            required: ['oldPassword', 'newPasswordConfirmation', 'newPassword']
          }
        }
      }
    })
    request: {
      oldPassword: string,
      newPassword: string,
      newPasswordConfirmation: string
    }
  ): Promise<void> {

    const user = await this.userRepository.findById(this.user[securityId])
    const result = await this.hasher.comparePassword(request.oldPassword, user.password)
    if (!result) throw new HttpErrors.UnprocessableEntity('Senha incorreta')
    if (request.newPassword !== request.newPasswordConfirmation) throw new HttpErrors.UnprocessableEntity('Senhas não coicidem')
    const password = await this.hasher.hashPassword(request.newPassword)
    await this.userRepository.updateById(user.getId(), {password})
  }
}
