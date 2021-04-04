import { Form } from 'ant-design-vue';
import {
  h, reactive, resolveComponent, VNode
} from 'vue';
import { BindData, DFormField } from './types';

const tmpData = reactive({});
// 生成表单条目
function generateFormItems(fields: Array<DFormField>, data: BindData = tmpData): Array<VNode> {
  return fields.map((field: DFormField, index: number) => {
    const { dataKey } = field;
    const ipt = h(resolveComponent(field.inputType), {
      key: `${dataKey}-${index}`,
      value: data[dataKey],
      'onUpdate:value': (val: any) => {
        data[dataKey] = val;
      }
    });
    return h(Form.Item, {
      label: field.label,
      name: field.dataKey
    }, {
      default: () => ipt
    });
  });
}

// 生成表单校验规则
function generateFormRules(fields: Array<DFormField>) {
  const rules = {};
  fields.forEach((def: DFormField) => {
    if (def.validator) {
      Reflect.set(rules, def.dataKey, def.validator);
    }
  });
  return rules;
}

export { generateFormItems, generateFormRules };
