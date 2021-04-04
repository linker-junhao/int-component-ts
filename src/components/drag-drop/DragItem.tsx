import {
  ComponentPublicInstance,
  computed, defineComponent, h, inject, ref
} from 'vue';
import { devWarn } from '../dynamic-form/utils';

export interface DragItemProps {
  allowDrag: Function | null,
  data: Object
}

const DragItemCommonData = {
  uid: 0
};

export const DragItem = defineComponent({
  name: 'DragItem',
  props: {
    allowDrag: {
      type: [Function],
      default() {
        return null;
      }
    },
    data: {
      type: Object,
      required: true
    }
  },
  setup(props: DragItemProps) {
    const ijctAllowDrag: Function | undefined = inject('allowDrag');

    // 优先使用本身的检测，没有再使用provide的可否拖拽检测，
    const draggable = computed(() => {
      if (props.allowDrag !== null) {
        return props.allowDrag(props.data);
      }
      return ijctAllowDrag ? ijctAllowDrag(props.data) : true;
    });

    const uid = ref(DragItemCommonData.uid += 1);

    return {
      draggable, uid
    };
  },
  render() {
    return h('div', {
      draggable: this.draggable
    }, this.$slots?.default?.());
  },
  mounted() {
    this.$el.addEventListener('dragstart', (e: DragEvent) => {
      if (!e.dataTransfer) {
        devWarn('浏览器不支持dataTransfer');
      }
      this.$dragDropDataCenter.setData(e, this);
      e.stopPropagation();
    });
  }
});
