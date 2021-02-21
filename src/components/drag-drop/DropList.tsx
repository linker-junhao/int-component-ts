import {
  defineComponent, reactive
} from 'vue';
import DropItem from './DropItem';

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
    const dropItems = this.listData.map((item, idx) => (
      <DropItem itemData={item} key={idx}/>
    ));
    return (
      <div class="h-screen">
        {dropItems}
        { this.$slots?.default?.() }
      </div>
    );
  },
  setup() {
    const listData: Array<any> = reactive([]);
    return { listData };
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
