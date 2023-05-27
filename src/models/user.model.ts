import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {Submission} from './submission.model';
import {Doubt} from './doubt.model';

@model({
  settings: {
    mysql: {
      table: 'users'
    },
    postgresql: {
      table: 'users'
    },
  }
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'INTEGER',
    },
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
      format: 'email',
    },
    /*     index: {
          unique: true
        } */


  })
  email: string;

  @property({
    type: 'string',
    required: true,
    minLength: 8,
    hidden: true,
    jsonSchema: {
      minLength: 8,
    },
    postgresql: {
      columnName: 'password',
      nullable: 'NO',
      dataLength: 40
    }
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'role',
      nullable: 'NO',
      dataLength: 40,
    }
  })
  role: string;
  @hasMany(() => Submission, {name: 'submissions'})
  submissions: Submission[];

  @hasOne(() => Doubt, {keyTo: 'studentId'})
  doubt: Doubt;

  @hasMany(() => Doubt, {keyTo: 'advisorId'})
  doubts: Doubt[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}
export type UserWithRelations = User & UserRelations;
