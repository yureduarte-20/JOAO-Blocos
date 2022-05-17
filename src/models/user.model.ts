import {Entity, hasMany, model, property} from '@loopback/repository';
import {Submission} from './submission.model';
@model({
  settings: {
    mysql: {
      table: 'users'
    }
  }
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mysql: {
      dataType: 'INTEGER',
    }
  })
  id?: string;

  @property({
    type: 'string',
    required: true,

  })
  name: string;

  @property({
    type: 'string',
    required: true,
    format: 'email',
    jsonSchema: {
      format: 'email'
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    hidden: true,
    minLength: 8,
    jsonSchema: {
      minLength: 8,
      hidden: true,
    }
  })
  password: string;

  @property({
    type: 'string',
    required: true,

  })
  role: string;
  @hasMany(() => Submission, {name: 'submissions'})
  submissions: Submission[];
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}
export type UserWithRelations = User & UserRelations;
