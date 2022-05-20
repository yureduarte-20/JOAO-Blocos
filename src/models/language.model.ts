import {Entity, hasMany, model, property} from '@loopback/repository';
import {Submission} from './submission.model';

@model({
  settings: {
    allowExtendedOperators: true,
  }
})
export class Language extends Entity {
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
    postgresql: {
      columnName: 'language_version',
    }
  })
  languageVersion?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'docker_tag_version',
    }
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
