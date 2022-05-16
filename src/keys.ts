import {UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {User} from './models';
import {PasswordHasher} from './services/hash.password';
import {JudgeService} from './services/judge.service';
import {Credentials} from './types';
export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, User>>(
    'services.user.service',
  );
}
export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}

export namespace JudgeServiceBindings {
  export const JUDGE = BindingKey.create<JudgeService>('services.judge')
}

export const enum Roles {
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
  CONSUMER = 'CONSUMER'
}
