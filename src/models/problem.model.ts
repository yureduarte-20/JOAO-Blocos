import {Entity, hasMany, model, property} from '@loopback/repository';
import {Submission} from './submission.model';
import {Doubt} from './doubt.model';

export interface ITestCase {
  inputs?: string[];
  outputs: string;
  validationOutputRegex?: string
}

export interface IDemonstrations {
  demonstrationInputs?: string[];
  demonstrationOutput: string;
}
@model({
  settings: {
    //allowExtendedOperators: true,
  },
})
export class Problem extends Entity {
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

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'title',
      dataLength: 20,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;
  @property.array(Object, {
    jsonSchema: {
      properties: {
        inputs: {
          type: "array",
          items: {
            type: "string"
          }
        },
        outputs: {
          type: 'string',

        },
        validationOutputRegex: {
          type: 'string',

        },

      },
      required: ['outputs']
    },
    require: true
  })
  testCases: ITestCase[]

  @property({
    required: true,
    type: 'string',
    postgresql: {
      columnName: 'dificulty_level',
      dataType: 'VARCHAR',
      dataLength: 20
    },
  })
  dificultyLevel: string;

  @hasMany(() => Submission, {name: 'submissions'})
  submissions?: Submission[]

  @property.array(Object, {
    required: true,
    jsonSchema: {
      properties: {
        demonstrationInputs: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        demonstrationOutput: {
          type: 'string'
        }
      },
      required: ['demonstrationOutput']
    },

  })
  demonstrations: IDemonstrations[]

  @hasMany(() => Doubt)
  doubts: Doubt[];

  constructor(data?: Partial<Problem>) {
    super(data);
  }
}

export interface ProblemRelations {
  // describe navigational properties here
}

export type ProblemWithRelations = Problem & ProblemRelations;
