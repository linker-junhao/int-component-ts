import { defineComponent, provide } from 'vue';

export interface DragListProps {
  allowDrag: Function,
}

export const DragList = defineComponent({
  name: 'DragList',
  props: {
    allowDrag: {
      type: [Function],
      default() {
        return () => true;
      }
    }
  },
  setup(props: DragListProps) {
    provide('allowDrag', props.allowDrag);
  },
  render() {
    return (
      <div draggable="false">
        { this.$slots?.default?.() }
      </div>
    );
  }
});
