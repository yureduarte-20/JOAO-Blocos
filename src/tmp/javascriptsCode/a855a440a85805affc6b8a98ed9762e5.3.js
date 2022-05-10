
      const process = require('process');
      let argsIndex = 2;
      const window = {
        alert:(...msg ) => console.log(...msg),
        prompt:(...args) => process.argv[argsIndex++]
      }
      for(let i = 0; i < 1000000000; i++) console.log('loop infinito.')