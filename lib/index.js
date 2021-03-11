(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('ant-design-vue')) :
    typeof define === 'function' && define.amd ? define(['vue', 'ant-design-vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ultralightCopy = factory(global.vue, global.antDesignVue));
}(this, (function (vue, antDesignVue) { 'use strict';

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

        this.formDatas = vue.reactive({});
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

    var tmpData = vue.reactive({}); // 生成表单条目

    function generateFormItems(fields) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tmpData;
      return fields.map(function (field, index) {
        var dataKey = field.dataKey;
        var ipt = vue.h(vue.resolveComponent(field.inputType), {
          key: "".concat(dataKey, "-").concat(index),
          value: data[dataKey],
          'onUpdate:value': function onUpdateValue(val) {
            data[dataKey] = val;
          }
        });
        return vue.h(antDesignVue.Form.Item, {
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

    var DynamicForm$1 = vue.defineComponent({
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
        var data = vue.reactive({}); // 将数据对象引用到全局数据中心

        globalFormDatas.setData(props.definition.name, data); // 生成表单控件

        var inputControls = vue.computed(function () {
          return generateFormItems(props.definition.fields, data);
        }); // 生成校验规则

        var validateRules = vue.computed(function () {
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

        return vue.h(antDesignVue.Form, {
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

    var DynamicForm = {
      DynamicForm: DynamicForm$1
    };

    var DropItem = vue.defineComponent({
      name: 'DropItem',
      props: {
        itemData: {
          type: [Object, Number, String, Array],
          required: true
        }
      },
      render: function render() {
        var _this$$slots, _this$$slots$default;

        return vue.h('div', (_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$default = _this$$slots["default"]) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots));
      }
    });

    var DropList = vue.defineComponent({
      name: 'DropList',
      props: {
        allowDrop: {
          type: Function,
          "default": function _default() {
            return function () {
              return true;
            };
          }
        },
        modelValue: {
          type: Array,
          "default": function _default() {
            return [];
          }
        }
      },
      emits: ['update:modelValue'],
      render: function render() {
        var _this = this;

        var dropItems = this.listData.map(function (item) {
          _this.itemKey += 1;
          return vue.h(DropItem, {
            itemData: item,
            key: _this.itemKey
          }, function () {
            var _this$$slots, _this$$slots$item;

            return (_this$$slots = _this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$item = _this$$slots.item) === null || _this$$slots$item === void 0 ? void 0 : _this$$slots$item.call(_this$$slots, {
              itemData: item
            });
          });
        });
        return vue.h('div', {
          "class": 'h-screen'
        }, dropItems);
      },
      setup: function setup() {
        var listData = vue.reactive([]);
        var itemKey = 0;
        return {
          listData: listData,
          itemKey: itemKey
        };
      },
      mounted: function mounted() {
        var _this2 = this;

        var el = this.$el;
        el.addEventListener('drop', function (e) {
          var data = JSON.parse(JSON.stringify(_this2.$dragDropDataCenter.getData(e)));

          _this2.listData.push(data);

          _this2.$emit('update:modelValue', _this2.listData);
        });
        el.addEventListener('dragover', function (e) {
          var data = _this2.$dragDropDataCenter.getData(e);

          var droppable = _this2.allowDrop(data);

          if (droppable) {
            e.preventDefault();
          }
        });
      }
    });

    var DragItemCommonData = {
      uid: 0
    };
    var DragItem = vue.defineComponent({
      name: 'DragItem',
      props: {
        allowDrag: {
          type: [Function],
          "default": function _default() {
            return null;
          }
        },
        data: {
          type: Object,
          required: true
        }
      },
      setup: function setup(props) {
        var ijctAllowDrag = vue.inject('allowDrag'); // 优先使用本身的检测，没有再使用provide的可否拖拽检测，

        var draggable = vue.computed(function () {
          if (props.allowDrag !== null) {
            return props.allowDrag(props.data);
          }

          return ijctAllowDrag ? ijctAllowDrag(props.data) : true;
        });
        var uid = vue.ref(DragItemCommonData.uid += 1);
        return {
          draggable: draggable,
          uid: uid
        };
      },
      render: function render() {
        var _this$$slots, _this$$slots$default;

        return vue.h('div', {
          draggable: this.draggable
        }, (_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$default = _this$$slots["default"]) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots));
      },
      mounted: function mounted() {
        var _this = this;

        this.$el.addEventListener('dragstart', function (e) {
          if (!e.dataTransfer) {
            devWarn('浏览器不支持dataTransfer');
          }

          _this.$dragDropDataCenter.setData(e, _this);

          e.stopPropagation();
        });
      }
    });

    var DragList = vue.defineComponent({
      name: 'DragList',
      props: {
        allowDrag: {
          type: [Function],
          "default": function _default() {
            return function () {
              return true;
            };
          }
        }
      },
      setup: function setup(props) {
        vue.provide('allowDrag', props.allowDrag);
      },
      render: function render() {
        var _this$$slots, _this$$slots$default;

        return vue.createVNode("div", {
          "draggable": "false"
        }, [(_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$default = _this$$slots["default"]) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);
      }
    });

    var DataCenter = /*#__PURE__*/function () {
      function DataCenter() {
        _classCallCheck(this, DataCenter);

        this.dragList = new Map();
        this.TransferDataName = 'id';
      }

      _createClass(DataCenter, [{
        key: "getData",
        value: function getData(e) {
          var _e$dataTransfer;

          var id = (_e$dataTransfer = e.dataTransfer) === null || _e$dataTransfer === void 0 ? void 0 : _e$dataTransfer.getData(this.TransferDataName);

          if (id) {
            return this.dragList.get(id);
          }

          return null;
        }
      }, {
        key: "setData",
        value: function setData(e, dragItem) {
          var _e$dataTransfer2;

          var settledId = dragItem.uid.toString();
          this.dragList.set(settledId, dragItem.data);
          (_e$dataTransfer2 = e.dataTransfer) === null || _e$dataTransfer2 === void 0 ? void 0 : _e$dataTransfer2.setData(this.TransferDataName, settledId);
        }
      }]);

      return DataCenter;
    }();

    var installer = {
      install: function install(app) {
        app.config.globalProperties.$dragDropDataCenter = new DataCenter();
      }
    };

    var DragDrop = {
      installer: installer,
      DragItem: DragItem,
      DragList: DragList,
      DropList: DropList,
      DropItem: DropItem,
      DataCenter: DataCenter
    };

    var index = {
      DynamicForm: DynamicForm,
      DragDrop: DragDrop
    };

    return index;

})));
