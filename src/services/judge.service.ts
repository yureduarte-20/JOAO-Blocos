import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {securityId, UserProfile} from '@loopback/security';
import {exec, execSync, spawn} from 'child_process';
import {randomBytes} from 'crypto';
import {unlink, writeFile} from 'fs';
@authenticate("jwt")

export class TimeOutError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "Timeout Error"
  }
}
export class JudgeService {
  private readonly path: string;
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER)
    private user: UserProfile
  ) {
    this.path = execSync("pwd").toString().trim()
  }
  async execute(language: string, code: string) {
    let saidas: any = [];
    let erros: any = [];
    return new Promise<any>((res, rej) => {
      let comand = `
      const process = require('process');
      let argsIndex = 2;
      const window = {
        alert:(...msg ) => console.log(...msg),
        prompt:(...args) => process.argv[argsIndex++]
      }
      `

      if (language === "javascript") {
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
            "node:16.14.2", fileName, "olá mundo!"])

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
      }
    })
  }
}
