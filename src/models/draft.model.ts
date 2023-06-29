import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Draft extends Entity {
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
  blocksXml: string;

  @property({
    type: 'date',
    defaultFn: 'now'
  })
  createdAt?: string;

  @property({
    type: 'date',
    defaultFn: 'now'
  })
  updatedAt?: string;

  @belongsTo(() => User, {}, {required: true})
  userId: string;

  constructor(data?: Partial<Draft>) {
    super(data);
  }
}

export interface DraftRelations {
  // describe navigational properties here
}

export type DraftWithRelations = Draft & DraftRelations;
