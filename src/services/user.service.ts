import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories/user.repository';
import {Credentials} from '../types';
import {BcryptHasher} from './hash.password';


export class MyUserService implements UserService<User, Credentials>{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher

  ) { }
  async verifyCredentials(credentials: Credentials): Promise<User> {
    // implement this method
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email
      }
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound('user not found');
    }
    const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password)
    if (!passwordMatched)
      throw new HttpErrors.Unauthorized('password is not valid');
    return foundUser;
  }
  convertToUserProfile(user: User): UserProfile {
    let userName = user.name;
    return {
      [securityId]: user.id!.toString(),
      name: userName,
      id: user.id,
      email: user.email,
    };
  }


}
