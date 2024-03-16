import Blockly from 'blockly';
const b = Blockly as any
b.Blocks['round_with_digits'] = {
    init: function () {
        this.appendValueInput("target")
            .setCheck("Number")
            .appendField("Reduzir o número de casas decimais em ");
        this.appendDummyInput()
            .appendField("com")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "float_point")
            .appendField(" dígitos");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
b.JavaScript['round_with_digits'] = function (block: any, generator: any = b.JavaScript) {
    let value_target = generator.valueToCode(block, 'target', b.JavaScript.ORDER_ATOMIC);
    let number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ? '0' : value_target;

    // Montar o código para realizar o arredondamento com os dígitos especificados
    let code = + 'Number(' + value_target + ').toFixed(' + number_float_point + ')';
    code = `Number(${value_target}).toFixed(${number_float_point})`
    return [code, b.JavaScript.ORDER_FUNCTION_CALL];
};

b.Python['round_with_digits'] = function (block: any, generator: any = b.Python) {
    var value_target = b.Python.valueToCode(block, 'target', b.Python.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ? '0' : value_target;
    var code = 'round(' + value_target + ', ' + number_float_point + ')';
    return [code, b.Python.ORDER_FUNCTION_CALL];
};

b.PHP['round_with_digits'] = function (block: any, generator: any = b.PHP) {
    var value_target = b.PHP.valueToCode(block, 'target', b.PHP.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ? '0' : value_target;
    var code = 'round(' + value_target + ', ' + number_float_point + ')';

    return [code, b.PHP.ORDER_FUNCTION_CALL];
};

b.Lua['round_with_digits'] = function (block: any, generator: any = b.Lua) {
    var value_target = b.Lua.valueToCode(block, 'target', b.Lua.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ? '0' : value_target;
    var code = 'math.round(' + value_target + ', ' + number_float_point + ')';

    return [code, b.Lua.ORDER_FUNCTION_CALL];
};

b.Dart['round_with_digits'] = function (block: any, generator = b.Dart) {
    var value_target = b.Dart.valueToCode(block, 'target', b.Dart.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ? '0' : value_target;
    var code = 'num.parse(' + value_target + '.toStringAsFixed(' + number_float_point + '))';

    return [code, b.Dart.ORDER_FUNCTION_CALL];
};
export default b
