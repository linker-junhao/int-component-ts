import {
  computed, defineComponent, h, PropType, reactive
} from 'vue';
import { Form } from 'ant-design-vue';
import DFormDefinition from './type';
import validator from './DefinitionPropValidator';
import globalFormDatas from './FormDataCenter';
import { generateFormItems, generateFormRules } from './DFormPartialGenerator';

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
    // 表单绑定的数据对象
    const data = reactive({});

    // 将数据对象引用到全局数据中心
    globalFormDatas.setData(props.definition.name, data);

    // 生成表单控件
    const inputControls = computed(() => generateFormItems(props.definition.fields, data));

    // 生成校验规则
    const validateRules = computed(() => generateFormRules(props.definition.fields));

    return { data, inputControls, validateRules };
  },
  render() {
    return h(Form, {
      model: this.data,
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
      rules: this.validateRules
    }, {
      default: () => this.inputControls
    });
  }
});
