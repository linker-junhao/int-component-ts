import {
  computed, defineComponent, h, PropType, reactive
} from 'vue';
import { Form } from 'ant-design-vue';
import DFormDefinition from './DefinitionInterface';
import validator from './DefinitionPropValidator';
import globalFormDatas from './FormDataCenter';
import { generateFormItems, generateFormRules } from './Generator';

/**
 * stage1: 集成校验
 */
export default defineComponent({
  name: 'DynamicForm',
  props: {
    definition: {
      type: Object as PropType<DFormDefinition>,
      required: true,
      validator
    }
  },
  setup(props) {
    // 表单绑定的对象
    const data = reactive({});
    globalFormDatas.setData(props.definition.name, data);

    const inputControls = computed(() => generateFormItems(props.definition, data));
    const validateRules = computed(() => generateFormRules(props.definition));

    return { data, inputControls, validateRules };
  },
  render() {
    return h(Form, {
      model: this.data,
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
      rules: this.validateRules
    }, this.inputControls);
  }
});
