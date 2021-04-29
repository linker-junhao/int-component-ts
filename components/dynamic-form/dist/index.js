import { reactive, h, resolveComponent, defineComponent, computed } from 'vue';
import { Form } from 'ant-design-vue';

// eslint-disable-next-line import/prefer-default-export
function devWarn(msg) {
  console.warn("%c".concat(msg), 'color: green; background-color: orange;');
}

function strNotNulUndefEmpty(val) {
  return val !== '' && val !== null && val !== undefined;
} // 校验表单定义数据


function validField(field) {
  if (!strNotNulUndefEmpty(field.inputType)) {
    devWarn('inputType required');
    return false;
  }

  if (!strNotNulUndefEmpty(field.dataKey)) {
    devWarn('key required');
    return false;
  }

  return true;
} // 校验


function definitionValidator(val) {
  if (val.fields instanceof Array) {
    var ret = true;
    val.fields.forEach(function (f) {
      ret = ret && validField(f);
    });
    return ret;
  }

  devWarn('fields required');
  return false;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var FormDataCenter = /*#__PURE__*/function () {
  function FormDataCenter() {
    _classCallCheck(this, FormDataCenter);

    this.formDatas = reactive({});
  }

  _createClass(FormDataCenter, [{
    key: "getByName",
    value: function getByName(name) {
      return this.formDatas[name];
    }
  }, {
    key: "setData",
    value: function setData(name, data) {
      this.formDatas[name] = data;
      return this;
    }
  }]);

  return FormDataCenter;
}();

var globalFormDatas = new FormDataCenter();

var tmpData = reactive({}); // 生成表单条目

function generateFormItems(fields) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tmpData;
  return fields.map(function (field, index) {
    var dataKey = field.dataKey;
    var ipt = h(resolveComponent(field.inputType), {
      key: "".concat(dataKey, "-").concat(index),
      value: data[dataKey],
      'onUpdate:value': function onUpdateValue(val) {
        data[dataKey] = val;
      }
    });
    return h(Form.Item, {
      label: field.label,
      name: field.dataKey
    }, {
      "default": function _default() {
        return ipt;
      }
    });
  });
} // 生成表单校验规则


function generateFormRules(fields) {
  var rules = {};
  fields.forEach(function (def) {
    if (def.validator) {
      Reflect.set(rules, def.dataKey, def.validator);
    }
  });
  return rules;
}

/**
 * stage1: 集成校验
 */

var DynamicForm = defineComponent({
  name: 'DynamicForm',
  props: {
    definition: {
      type: Object,
      required: true,
      validator: definitionValidator
    }
  },
  setup: function setup(props) {
    // 表单绑定的数据对象
    var data = reactive({}); // 将数据对象引用到全局数据中心

    globalFormDatas.setData(props.definition.name, data); // 生成表单控件

    var inputControls = computed(function () {
      return generateFormItems(props.definition.fields, data);
    }); // 生成校验规则

    var validateRules = computed(function () {
      return generateFormRules(props.definition.fields);
    });
    return {
      data: data,
      inputControls: inputControls,
      validateRules: validateRules
    };
  },
  render: function render() {
    var _this = this;

    return h(Form, {
      model: this.data,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 4
      },
      rules: this.validateRules
    }, {
      "default": function _default() {
        return _this.inputControls;
      }
    });
  }
});

var ValidatorTypeEnum;

(function (ValidatorTypeEnum) {
  ValidatorTypeEnum["string"] = "string";
  ValidatorTypeEnum["number"] = "number";
  ValidatorTypeEnum["boolean"] = "boolean";
  ValidatorTypeEnum["method"] = "method";
  ValidatorTypeEnum["regexp"] = "regexp";
  ValidatorTypeEnum["integer"] = "integer";
  ValidatorTypeEnum["float"] = "float";
  ValidatorTypeEnum["array"] = "array";
  ValidatorTypeEnum["object"] = "object";
  ValidatorTypeEnum["enum"] = "enum";
  ValidatorTypeEnum["date"] = "date";
  ValidatorTypeEnum["url"] = "url";
  ValidatorTypeEnum["hex"] = "hex";
  ValidatorTypeEnum["email"] = "email";
  ValidatorTypeEnum["any"] = "any";
})(ValidatorTypeEnum || (ValidatorTypeEnum = {}));

export default DynamicForm;
export { FormDataCenter, ValidatorTypeEnum, definitionValidator, devWarn, generateFormItems, generateFormRules, globalFormDatas, strNotNulUndefEmpty, validField };
//# sourceMappingURL=index.js.map
