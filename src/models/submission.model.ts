import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Issue} from './issue.model';
import {Language} from './language.model';
import {User} from './user.model';

@model({
  settings: {
    strict: true,
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
    type: 'String',
    id: true,
    defaultFn: 'uuid',
    postgresql: {
      columnName: 'id',
      dataType: 'uuid',
    },
  })
  id?: string;
  @belongsTo(() => User, {name: 'owner'}, {
    postgresql: {
      dataType: 'uuid',
      nullable: 'NO',
    },
    required: true
  })
  userId: string;

  @belongsTo(() => Issue, {name: 'issue'}, {
    postgresql: {
      dataType: 'uuid',
      nullable: 'NO',
    },
    required: true
  })
  issueId: string;


  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @belongsTo(() => Language, {name: 'language'}, {
    type: 'String',
    postgresql: {
      dataType: 'uuid',
      nullable: 'NO',
    },
    required: true
  })
  languageId: string;
  @property({
    type: 'string'
  })
  blocksXml?: string
  @property({
    type: 'string',
  })
  runtime_error?: string
  constructor(data?: Partial<Submission>) {
    super(data);
  }
}

export interface SubmissionRelations {

}

export type SubmissionWithRelations = Submission & SubmissionRelations;
