import Form from 'ant-design-vue/lib/form/Form';
import {
  h, resolveComponent, unref, VNode
} from 'vue';
import BindData from './BindDataInterface';
import DFormDefinition, { DFormField } from './DefinitionInterface';

function generateFormItems(defs: DFormDefinition, data: BindData): Array<VNode> {
  const fileds = unref(defs).fields;
  return fileds.map((field: DFormField, index: number) => {
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

function generateFormRules(defs: DFormDefinition) {
  const rules = {};
  unref(defs).fields.forEach((def: DFormField) => {
    if (def.validator) {
      Reflect.set(rules, def.dataKey, def.validator);
    }
  });
  return rules;
}

export { generateFormItems, generateFormRules };
