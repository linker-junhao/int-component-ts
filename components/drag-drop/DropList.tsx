import {
  defineComponent, h, reactive
} from 'vue';
import dataCenter from './DataCenter';
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
    el.addEventListener('dragover', (e: DragEvent) => {
      try {
        const data = dataCenter.getData(e);
        const droppable = this.allowDrop(data);
        if (droppable) {
          e.preventDefault();
        }
      } catch (err: any) {
        console.warn(err);
        e.preventDefault();
      }
    });

    el.addEventListener('drop', (e: DragEvent) => {
      const data = dataCenter.getData(e);
      this.listData.push(data);
      this.$emit('update:modelValue', this.listData);
    });
  }
});
