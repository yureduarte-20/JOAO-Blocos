import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Issue} from './issue.model';
import {Language} from './language.model';
import {User} from './user.model';

@model()
export class Submission extends Entity {
  @belongsTo(() => User, {name: 'owner'})
  userId: string;

  @belongsTo(() => Issue, {name: 'issue'})
  issueId: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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

  @belongsTo(() => Language, {name: 'language'})
  languageId: string;
  @property({
    type: 'string'
  })
  blocksXml?: string

  constructor(data?: Partial<Submission>) {
    super(data);
  }
}

export interface SubmissionRelations {
  // describe navigational properties here
}

export type SubmissionWithRelations = Submission & SubmissionRelations;
