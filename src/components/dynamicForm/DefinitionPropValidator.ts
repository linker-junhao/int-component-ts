import DFormDefinition, { DFormField } from './DefinitionInterface';
import devWarn from './utils';

function strNotNulUndefEmpty(val: string) {
  return val !== '' && val !== null && val !== undefined;
}

function validField(field: DFormField) {
  if (!strNotNulUndefEmpty(field.inputType)) {
    devWarn('inputType required');
    return false;
  }
  if (!strNotNulUndefEmpty(field.dataKey)) {
    devWarn('key required');
    return false;
  }
  return true;
}

function validator(val: DFormDefinition) {
  if (val.fields instanceof Array) {
    let ret = true;
    val.fields.forEach((f) => {
      ret = ret && validField(f);
    });
    return ret;
  }
  devWarn('fields required');
  return false;
}

export default validator;
