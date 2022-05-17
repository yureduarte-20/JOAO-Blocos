import {Entity, hasMany, model, property} from '@loopback/repository';
import {Submission} from './submission.model';

@model()
export class Issue extends Entity {
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
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  expectedOutput: string;

  @property({
    type: 'array',
    itemType: 'any'
  })
  args?: any[];

  @property({
    required: true,
    type: 'string'
  })
  dificultyLevel: string;

  @hasMany(() => Submission, {name: 'submissions'})
  submissions?: Submission[]
  constructor(data?: Partial<Issue>) {
    super(data);
  }
}

export interface IssueRelations {
  // describe navigational properties here
}

export type IssueWithRelations = Issue & IssueRelations;
