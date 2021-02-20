import { computed, defineComponent, h } from 'vue';

export default defineComponent({
  name: 'DropList',
  props: {
    allowDrop: {
      type: Function,
      default() {
        return () => true;
      }
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  render() {
    return (
      <div class="h-screen">
        { this.$slots?.default?.() }
      </div>
    );
  },
  setup() {},
  mounted() {
    const el = this.$el;
    el.addEventListener('drop', (e: DragEvent) => {
      const data = JSON.parse(JSON.stringify(this.$dragDropDataCenter.getData(e)));
      console.log(data);
      this.$emit('update:value', this.value.concat(data));
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
