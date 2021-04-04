import {
  defineComponent, h, reactive
} from 'vue';
import { DropItem } from './DropItem';

export default defineComponent({
  name: 'DropList',
  props: {
    allowDrop: {
      type: Function,
      default() {
        return () => true;
      }
    },
    modelValue: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: ['update:modelValue'],
  render() {
    const dropItems = this.listData.map((item) => {
      this.itemKey += 1;
      return h(DropItem, {
        itemData: item,
        key: this.itemKey
      }, () => this.$slots?.item?.({ itemData: item }));
    });
    return h('div', {
      class: 'h-screen'
    }, dropItems);
  },
  setup() {
    const listData: Array<any> = reactive([]);
    const itemKey = 0;
    return { listData, itemKey };
  },
  mounted() {
    const el = this.$el;
    el.addEventListener('drop', (e: DragEvent) => {
      const data = JSON.parse(JSON.stringify(this.$dragDropDataCenter.getData(e)));
      this.listData.push(data);
      this.$emit('update:modelValue', this.listData);
    });
    el.addEventListener('dragover', (e: DragEvent) => {
      const data = this.$dragDropDataCenter.getData(e);
      const droppable = this.allowDrop(data);
      if (droppable) {
        e.preventDefault();
      }
    });
  }
});
