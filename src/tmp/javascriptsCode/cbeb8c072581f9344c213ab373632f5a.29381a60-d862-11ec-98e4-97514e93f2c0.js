
  let _args_variables = '1,2';
  _args_variables = _args_variables.split(',').map(item => isNaN(Number(item)) ? (item[0] === ":" ? item.slice(1) : item  ) : Number(item))
  let __argsIndex = 0;
  const window = {
    alert:(...msg ) => console.log(...msg),
    prompt:(...args) => _args_variables[__argsIndex++]
  }
  var num, word;num = Number(window.prompt('Digite um número: '));word = window.prompt('digite uma palavra');window.alert(String(num) + String(word));