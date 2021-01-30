import {
  computed,
  defineComponent, h, PropType, reactive, resolveComponent, unref
} from 'vue';
import { Form } from 'ant-design-vue';
import DFomrDefinition, { DFormField } from './DefinitionInterface';

interface BindData {
  [key: string]: any
}
function generateFormItems(defs: DFomrDefinition, data: BindData) {
  const fileds = unref(defs).fields;
  return fileds.map((field: DFormField) => {
    const fieldKey = field.key;
    const ipt = h(resolveComponent(field.inputType), {
      value: data[fieldKey],
      onChange: (val: any) => {
        data[fieldKey] = val;
      }
    });
    return h(Form.Item, {
      label: field.label
    }, ipt);
  });
}

/**
 * stage1: 集成校验
 */
export default defineComponent({
  name: 'DynamicForm',
  props: {
    definition: {
      type: Object as PropType<DFomrDefinition>,
      required: true
    }
  },
  setup(props) {
    const data = reactive({});
    const inputControls = computed(() => generateFormItems(props.definition, data));
    return { data, inputControls };
  },
  render() {
    return h(Form, {
      model: this.data,
      labelCol: { span: 4 },
      wrapperCol: { span: 4 }
    }, this.inputControls);
  },
  mounted() {
    console.log(this);
  }
});
