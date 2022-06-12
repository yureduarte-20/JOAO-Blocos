import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SubmissionStatus} from '../keys';
import {Issue} from './issue.model';
import {Language} from './language.model';
import {User} from './user.model';

@model({
  settings: {
    //allowExtendedOperators: true,
    /*     foreignKeys: {
          fk_submission_userId: {
            name: 'fk_submission_userId',
            entity: 'User',
            entityKey: 'id',
            foreignKey: 'userid',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL'
          },
          fk_submission_issueId: {
            name: 'fk_submission_issueId',
            entity: 'Issue',
            entityKey: 'id',
            foreignKey: 'issueid',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL'
          },
        } */
  }
})
export class Submission extends Entity {
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
  @belongsTo(() => User, {name: 'owner'}, {
    type: 'string',
    hidden: true,
    postgresql: {
      dataType: 'INTEGER',
      nullable: 'NO',
    },
    required: true
  })
  userId: string;

  @belongsTo(() => Issue, {name: 'issue'}, {
    type: 'string',
    postgresql: {
      dataType: 'INTEGER',
      nullable: 'NO',
    },
    required: true
  })
  issueId: string;


  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: SubmissionStatus;

  @belongsTo(() => Language, {name: 'language'}, {
    type: 'string',
    postgresql: {
      dataType: 'INTEGER',
    },
  })
  languageId?: string;
  @property({
    type: 'string',
    required: true
  })
  blocksXml: string
  @property({
    type: 'string',
  })
  error?: string
  @property({
    type: 'date',
    defaultFn: 'now',
    postgresql: {
      columnName: 'created_at',
    }
  })
  createdAt: Date;
  constructor(data?: Partial<Submission>) {
    super(data);
  }
}

export interface SubmissionRelations {

}

export type SubmissionWithRelations = Submission & SubmissionRelations;
