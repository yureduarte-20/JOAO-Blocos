// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, post, requestBody, response} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {JudgeServiceBindings} from '../keys';
import {JudgeService} from '../services/judge.service';

class CompilationHttpError extends HttpErrors.UnprocessableEntity {
  constructor(message: string, details: any) {
    super(message);
    this.name = "compilation_error"
    this.details = details
  }
}
class PresentationHttpError extends HttpErrors.UnprocessableEntity {
  constructor(message: string, details: any) {
    super(message);
    this.name = "presentation_error"
    this.details = details
  }
}
class TimeoutHttpError extends HttpErrors.UnprocessableEntity {
  constructor(message: string, details: any) {
    super(message);
    this.name = "timeout_error"
    this.details = details
  }
}

@authenticate("jwt")
export class SubmissionController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile,
    @inject(JudgeServiceBindings.JUDGE)
    private judgeService: JudgeService
  ) { }

  @post('/submission')
  @response(200, {
    description: 'execution of javascript code'
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: {
              code: {
                type: 'string'
              }
            }
          }
        }
      }
    })
    body: {code: string}
  ): Promise<any> {

    try {

      const output = await this.judgeService.execute("javascript", body.code)
      const expected_output = "olá mundo!";
      if (expected_output === output)
        return Promise.resolve({
          status: 'ok',
          output: output
        })
      else
        return Promise.reject(new PresentationHttpError("Saída não condiz com a proposta pelo exercício", {
          error: {
            output: output,
          }
        }))
    } catch (e) {
      //console.log(e)
      if (e instanceof Error && e.name == "Timeout Error")
        return Promise.reject(new TimeoutHttpError(e.message, {
          error: {
            output: null
          }
        }))
      return Promise.reject(new CompilationHttpError("O arquivo não pode ser compilado corretamente, verifique o código e submeta novemante.", {
        error: {
          stack: e.toString(),
        }
      }))
    }
  }
}
