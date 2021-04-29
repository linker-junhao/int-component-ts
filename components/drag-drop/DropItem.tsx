import { defineComponent, h } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const DropItem = defineComponent({
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
