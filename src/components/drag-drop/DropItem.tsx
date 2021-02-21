import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'DropItem',
  props: {
    itemData: {
      type: [Object, Number, String, Array],
      required: true
    }
  },
  render() {
    return h('div', this.$slots?.default?.());
  }
});
