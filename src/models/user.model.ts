import {Entity, hasMany, model, property} from '@loopback/repository';
import {Submission} from './submission.model';
@model({
  settings: {
    hiddenProperties: ['password'],
    mysql: {
      table: 'users'
    },
    postgresql: {
      table: 'users'
    }
  }
})
export class User extends Entity {
  @property({
    type: 'String',
    id: true,
    defaultFn: 'uuid',
    postgresql: {
      columnName: 'id',
      dataType: 'uuid',
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
    index: {
      unique: true
    }


  })
  email: string;

  @property({
    type: 'string',
    required: true,
    minLength: 8,
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
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}
export type UserWithRelations = User & UserRelations;
