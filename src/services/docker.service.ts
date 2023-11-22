import {exec, spawn} from 'child_process';
import {TimeOutError} from './judge.service';

export class DockerService {
  private TIMEOUT_IN_SECONDS = 20;
  constructor() {
  }
  async executeContainer(dockerImage: string, basePath: string, fileName: string, container_name: string, args?: string[]): Promise<string> {
    let saidas: any = [];
    let erros: any = [];
    return new Promise<string>((res, rej) => {
      const argument = args ? [...args] : []

      const children_proccess = spawn("timeout", [
        "-s", "SIGKILL", this.TIMEOUT_IN_SECONDS.toString(),
        "docker", "run",
        "--workdir", "/home/app/tmp",
        "-v", `${basePath}:/home/app/tmp`,
        // remover container após ser usado
        "--rm",
        // limite de memória
        "--memory", "128m",
        // limite de uso de cpu, .5 é meio cpu
        "--name", container_name,
        "--cpus=.5",
        dockerImage, fileName, ...argument])
      children_proccess.stderr.on('data', (err) => {
        erros.push(Error(err))
      })
      children_proccess.stdout.on("data", c => {
        saidas.push(c.toString())
      })
      children_proccess.on("exit", (code, s) => {
        if (code == 137 || s == 'SIGKILL') {
          exec(`docker kill ${container_name}`)
          return rej(new TimeOutError(`O container ${container_name} demorou mais de ${this.TIMEOUT_IN_SECONDS} segundos para executar`))
        }
        if (code) return rej(erros[0]);
        res(saidas.join('').trimEnd());

      })
    })
  }

}
