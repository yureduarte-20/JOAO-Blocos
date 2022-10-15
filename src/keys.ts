import {UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {User} from './models';
import {DockerService} from './services/docker.service';
import {PasswordHasher} from './services/hash.password';
import {JudgeService} from './services/judge.service';
import NodeJSService from './services/nodejs.service';
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
  export const JUDGE = BindingKey.create<JudgeService>('services.judge');
}
export namespace DockerServiceBindings {
  export const DOCKER = BindingKey.create<DockerService>('services.docker');
}
export namespace NodeJSBindings {
  export const NODE_JS_SERVICE = BindingKey.create<NodeJSService>('services.nodejs')
}
export const enum Roles {
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
  CONSUMER = 'CONSUMER'
}
export const enum SubmissionStatus {
  ACCEPTED = 'ACCEPTED',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  PRESENTATION_ERROR = 'PRESENTATION_ERROR',
  PENDING = 'PENDING',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  COMPILATION_ERROR = 'COMPILATION_ERROR',
  WRONG_ANSWER = 'WRONG_ANSWER'
}
