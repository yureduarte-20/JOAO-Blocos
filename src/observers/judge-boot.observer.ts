import {inject, LifeCycleObserver} from '@loopback/core';
import {JudgeServiceBindings} from '../keys';
import {JudgeBootstraper} from '../services/judge.service';

export class JudgeBootObserver implements LifeCycleObserver {
  @inject(JudgeServiceBindings.JUDGE)
  private bootJudgeService: JudgeBootstraper;
  start() {
    this.bootJudgeService.boot(20);
  }
  stop() {
    this.bootJudgeService.destroy();
  }
}
