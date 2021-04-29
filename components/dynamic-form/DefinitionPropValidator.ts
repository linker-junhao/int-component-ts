import { DFormDefinition, DFormField } from './types';
import { devWarn } from './utils';

// 字符串判空值
function strNotNulUndefEmpty(val: string) {
  return val !== '' && val !== null && val !== undefined;
}

// 校验表单定义数据
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

// 校验
function definitionValidator(val: DFormDefinition) {
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

export {
  definitionValidator,
  strNotNulUndefEmpty,
  validField
};
