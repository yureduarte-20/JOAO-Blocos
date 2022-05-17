import {Entity, hasMany, model, property} from '@loopback/repository';
import {Submission} from './submission.model';

@model()
export class Language extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  version?: string;

  @property({
    type: 'string',
    required: true,
  })
  dockerTagVersion: string;

  @hasMany(() => Submission, {name: 'submissions'})
  submissions?: Submission[]
  constructor(data?: Partial<Language>) {
    super(data);
  }
}

export interface LanguageRelations {
  // describe navigational properties here
}

export type LanguageWithRelations = Language & LanguageRelations;
