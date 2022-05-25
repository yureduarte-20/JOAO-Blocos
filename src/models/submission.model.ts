import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SubmissionStatus} from '../keys';
import {Issue} from './issue.model';
import {Language} from './language.model';
import {User} from './user.model';

@model({
  settings: {
    allowExtendedOperators: true,
    foreignKeys: {
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
      fk_submission_languageId: {
        name: 'fk_submission_languageId',
        entity: 'Language',
        entityKey: 'id',
        foreignKey: 'languageid',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
    }
  }
})
export class Submission extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'INTEGER',
    },
  })
  id?: number;
  @belongsTo(() => User, {name: 'owner'}, {
    type: 'number',
    postgresql: {
      dataType: 'INTEGER',
      nullable: 'NO',
    },
    required: true
  })
  userId: number;

  @belongsTo(() => Issue, {name: 'issue'}, {
    type: 'number',
    postgresql: {
      dataType: 'INTEGER',
      nullable: 'NO',
    },
    required: true
  })
  issueId: number;


  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  status: SubmissionStatus;

  @belongsTo(() => Language, {name: 'language'}, {
    type: 'number',
    postgresql: {
      dataType: 'INTEGER',
      nullable: 'NO',
    },
    required: true
  })
  languageId: number;
  @property({
    type: 'string'
  })
  blocksXml?: string
  @property({
    type: 'string',
  })
  error?: string
  constructor(data?: Partial<Submission>) {
    super(data);
  }
}

export interface SubmissionRelations {

}

export type SubmissionWithRelations = Submission & SubmissionRelations;
