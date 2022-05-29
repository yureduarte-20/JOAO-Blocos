import {spawn} from 'child_process';
import {TimeOutError} from './judge.service';
export interface IFileNodejsProp {
  basePath: string, fileName: string,
}
export default class NodeJSService {
  private TIMEOUT_IN_SECONDS = 5;
  async execute({basePath, fileName}: IFileNodejsProp, args?: string[]) {
    let saidas: any = [];
    let erros: any = [];
    return new Promise<string>((res, rej) => {
      const argument = args ? [...args] : []

      const children_proccess = spawn("timeout", [
        "-s", "SIGTERM", this.TIMEOUT_IN_SECONDS.toString(),
        "node",
        `${basePath}/${fileName}`, ...argument])
      children_proccess.stderr.on('data', (err) => {
        erros.push(Error(err))
      })
      children_proccess.stdout.on("data", c => {
        saidas.push(c.toString())
      })
      children_proccess.on("exit", (code, s) => {

        if (code == 124 || s == 'SIGTERM') {
          return rej(new TimeOutError(`O código demorou mais de ${this.TIMEOUT_IN_SECONDS} segundos para executar`))
        }
        if (code) return rej(erros[0]);
        res(saidas.join('').trimEnd());
      })
    })
  }
}
