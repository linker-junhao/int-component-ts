import { defineComponent, h, reactive, inject, computed, ref, provide, createVNode } from 'vue';

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

var DataCenter = /*#__PURE__*/function () {
  function DataCenter() {
    _classCallCheck(this, DataCenter);

    this.dragList = new Map();
    this.TransferDataName = 'id';

    if (!DataCenter.instance) {
      DataCenter.instance = this;
    }

    return DataCenter.instance;
  }

  _createClass(DataCenter, [{
    key: "getData",
    value: function getData(e) {
      var _e$dataTransfer;

      var id = (_e$dataTransfer = e.dataTransfer) === null || _e$dataTransfer === void 0 ? void 0 : _e$dataTransfer.getData(this.TransferDataName);

      if (id) {
        return this.dragList.get(id);
      }

      throw new Error('outside drap event is not acceptable');
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

DataCenter.instance = null;
var dataCenter = new DataCenter(); // eslint-disable-next-line import/prefer-default-export

var DropItem = defineComponent({
  name: 'DropItem',
  props: {
    itemData: {
      type: [Object, Number, String, Array],
      required: true
    }
  },
  render: function render() {
    var _this$$slots, _this$$slots$default;

    return h('div', (_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$default = _this$$slots["default"]) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots));
  }
});

var DropList = defineComponent({
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
      return h(DropItem, {
        itemData: item,
        key: _this.itemKey
      }, function () {
        var _this$$slots, _this$$slots$item;

        return (_this$$slots = _this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$item = _this$$slots.item) === null || _this$$slots$item === void 0 ? void 0 : _this$$slots$item.call(_this$$slots, {
          itemData: item
        });
      });
    });
    return h('div', {
      "class": 'h-screen'
    }, dropItems);
  },
  setup: function setup() {
    var listData = reactive([]);
    var itemKey = 0;
    return {
      listData: listData,
      itemKey: itemKey
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    var el = this.$el;
    el.addEventListener('dragover', function (e) {
      try {
        var data = dataCenter.getData(e);

        var droppable = _this2.allowDrop(data);

        if (droppable) {
          e.preventDefault();
        }
      } catch (err) {
        console.warn(err);
        e.preventDefault();
      }
    });
    el.addEventListener('drop', function (e) {
      var data = dataCenter.getData(e);

      _this2.listData.push(data);

      _this2.$emit('update:modelValue', _this2.listData);
    });
  }
});

var installer = {
  install: function install(app) {
    app.config.globalProperties.$dragDropDataCenter = new DataCenter();
  }
};

var DragItemCommonData = {
  uid: 0
};
var DragItem = defineComponent({
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
    var ijctAllowDrag = inject('allowDrag'); // 优先使用本身的检测，没有再使用provide的可否拖拽检测，

    var draggable = computed(function () {
      if (props.allowDrag !== null) {
        return props.allowDrag(props.data);
      }

      return ijctAllowDrag ? ijctAllowDrag(props.data) : true;
    });
    var uid = ref(DragItemCommonData.uid += 1);
    return {
      draggable: draggable,
      uid: uid
    };
  },
  render: function render() {
    var _this$$slots, _this$$slots$default;

    return h('div', {
      draggable: this.draggable
    }, (_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$default = _this$$slots["default"]) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots));
  },
  mounted: function mounted() {
    var _this = this;

    this.$el.addEventListener('dragstart', function (e) {
      if (!e.dataTransfer) {
        console.warn('your browser not support dataTransfer');
      }

      dataCenter.setData(e, _this);
      e.stopPropagation();
    });
  }
});

var DragList = defineComponent({
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
    provide('allowDrag', props.allowDrag);
  },
  render: function render() {
    var _this$$slots, _this$$slots$default;

    return createVNode("div", {
      "draggable": "false"
    }, [(_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$default = _this$$slots["default"]) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);
  }
});

export default DropList;
export { DataCenter, DragItem, DragList, DropItem, installer };
//# sourceMappingURL=index.js.map
