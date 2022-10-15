import {Entity, hasMany, model, property} from '@loopback/repository';
import {Submission} from './submission.model';

export interface ITestCase {
  inputs?: string[];
  outputs: string;
  validationOutputRegex?: string
}
@model({
  settings: {
    //allowExtendedOperators: true,
  },
})
export class Issue extends Entity {
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

  @property.array(String, {
    require: true
  })
  demonstrationInputs?: string[];

  @property.array(String)
  demonstrationOutputs: string[];

  constructor(data?: Partial<Issue>) {
    super(data);
  }
}

export interface IssueRelations {
  // describe navigational properties here
}

export type IssueWithRelations = Issue & IssueRelations;
