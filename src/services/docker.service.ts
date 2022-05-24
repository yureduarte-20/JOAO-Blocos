import {spawn} from 'child_process';

export class DockerService {
  public countRunningContainer: number = 0
  constructor() {
  }
  async executeContainer(dockerImage: string, basePath: string, fileName: string, container_name: string, args?: string[]): Promise<string> {
    let saidas: any = [];
    let erros: any = [];
    const argument = args ? [...args] : []
    return new Promise<string>((res, rej) => {
      this.countRunningContainer++;
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
        dockerImage, fileName, ...argument])
      e.stderr.on('data', (err) => {

        let s: string = err.toString();
        if (s.includes('SyntaxError')) {
          let index = s.indexOf("SyntaxError:")
          let _n = s.indexOf('\n', index)

          console.log(s.slice(index, _n))
          console.log(s)
        }

        console.log(s.includes('ReferenceError'))
        console.log(s.includes('TypeError'))
        erros.push(Error(err))
      })
      e.stdout.on("data", c => {
        saidas.push(c.toString())
      })
      e.on("exit", (code, s) => {
        console.log(s)
        if (code) return rej(erros[0]);
        res(saidas.join('').trimEnd());
        this.countRunningContainer--;
      })
    })
  }

}
