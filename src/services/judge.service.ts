import {repository} from '@loopback/repository';
import {execSync} from 'child_process';
import {ScheduledTask} from 'node-cron';
import {SubmissionStatus} from '../keys';
import {Submission} from '../models';
import {LanguageRepository, SubmissionRepository} from '../repositories';

export class TimeOutError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "Timeout Error"
  }
}
export interface JudgeBootstraper {
  boot(cron_interval_time?: number): void;
  destroy(): void;
}
export class JudgeService implements JudgeBootstraper {
  private readonly path: string;
  private task: ScheduledTask;
  constructor(
    @repository('LanguageRepository')
    private languageRepository: LanguageRepository,
    @repository('SubmissionRepository')
    private submissionsRepository: SubmissionRepository
  ) {
    this.path = execSync("pwd").toString().trim()
  }
  boot(cron_interval_time?: number): void {
    (async () => {
      console.log(await this.getAllPendingSubmissions())
    })()

  }
  destroy(): void {
    this.task.stop();
  }
  private getAllPendingSubmissions(): Promise<Submission[]> {
    return this.submissionsRepository.find({where: {status: SubmissionStatus.PENDING}, include: ["language"]})
  }
  /* async execute(languageId: string, code: string, args?: string[]) {
    let saidas: any = [];
    let erros: any = [];
    const dockerTagVersion = (await this.languageRepository.findById(languageId)).dockerTagVersion
    return new Promise<any>((res, rej) => {
      let argu = args ? [...args] : [];
      let comand = `
      let _args_variables = '${args?.join(',')}';
      _args_variables = _args_variables.split(',').map(item => isNaN(Number(item)) ? (item[0] === ":" ? item.slice(1) : item  ) : Number(item))
      let __argsIndex = 0;
      const window = {
        alert:(...msg ) => console.log(...msg),
        prompt:(...args) => _args_variables[__argsIndex++]
      }
      `
      const basePath = this.path + '/src/tmp/javascriptsCode'
      const fileName = `${randomBytes(16).toString('hex')}.${this.user[securityId]}.js`
      const container_name = `${this.user[securityId]}_javascript`
      writeFile(`${basePath}/${fileName}`, comand.concat(code), (err) => {
        if (err) return rej(err)
        let e = spawn("docker", ["run",
          "--workdir", "/home/node/tmp",
          "-v", `${basePath}:/home/node/tmp`,
          // remover container após ser usado
          "--rm",
          // limite de memória
          "--memory", "128m",
          // limite de uso de cpu, .5 é meio cpu
          "--name", container_name,
          "--cpus=.5",
          dockerTagVersion, fileName])

        e.stderr.on('data', (err) => {
          erros.push(err)
          rej(err)
        })
        e.stdout.on("data", c => {
          saidas.push(c.toString())
        })
        e.on("exit", (code, s) => {
          unlink(`${basePath}/${fileName}`, (err) => {
            if (err) console.log(`Falhou em deletar ${fileName}`)
          })
          if (code) return rej(erros);
          res(saidas.join('').trim());
        })

        let t = setTimeout(() => {
          if (e.exitCode === null) {
            exec(`docker stop ${container_name}`, (err) => {
              if (err) return console.log("Não deu de matar o container");
              rej(new TimeOutError("Código excedeu o tempo para executar"))
            })
          }
          clearTimeout(t);
        }, 10000)
      })

    })
  } */

}
