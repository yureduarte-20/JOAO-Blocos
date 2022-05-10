
      const process = require('process');
      let argsIndex = 2;
      const window = {
        alert:(...msg ) => console.log(...msg),
        prompt:(...args) => process.argv[argsIndex++]
      }
      while(true){console.log('ta rodando')}