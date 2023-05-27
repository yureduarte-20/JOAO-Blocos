import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Problem} from './problem.model';
import {User} from './user.model';

export enum DoubtsTags {
  LOOPS = 'loops',
  CONDITIONAL = 'condicionais',
  VARIABLES = 'variaveis',
  INPUT_OUTPUTS = 'entrada_saida',
  OTHERS = 'outros'
}
export enum DoubtStatus {
  COMPLETE = 'COMPLETE',
  ON_GOING = 'ON_GOING',
  OPEN = 'OPEN'
}
export interface IMessage {
  message: string;
  userId: string;
  createdAt: string
}

@model()
export class Doubt extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  @property({type: 'string', required: true})
  problemTitle: string
  @property({
    jsonSchema: {
      enum: Object.values(DoubtStatus)
    },
    default: DoubtStatus.OPEN
  })
  status: DoubtStatus

  @property({
    type: 'string', default: DoubtsTags.OTHERS.toString()
  })
  tag: string

  @property({type: 'string'})
  advisorName?: string;

  @property({type: 'string', required: true})
  studentName: string;

  @property({type: 'date', defaultFn: 'now'})
  createdAt: string;
  @property.array(Object, {
    jsonSchema: {
      properties: {
        message: {
          type: 'string',
        },
        userId: {
          type: 'string'
        },
        createdAt: {
          type: 'string'
        }
      },
      required: ['message']
    }
  })
  messages?: IMessage[]

  @property({type: 'date', defaultFn: 'now'})
  updatedAt: string;

  @property({type: 'date'})
  closedAt?: string

  @belongsTo(() => User)
  studentId: string;

  @belongsTo(() => User)
  advisorId: string;

  @belongsTo(() => Problem)
  problemId: string;

  constructor(data?: Partial<Doubt>) {
    super(data);
  }
}

export interface DoubtRelations {
  // describe navigational properties here
}

export type DoubtWithRelations = Doubt & DoubtRelations;
