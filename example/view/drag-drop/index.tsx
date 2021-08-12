import {
  defineComponent, h, reactive
} from 'vue';

import './style.css';
import DropList, { DragItem, DragList } from '../../../components/drag-drop/index';

export default defineComponent({
  name: 'DragDrop',
  setup() {
    const dropListScopedSlot = {
      item: (props: any) => <div class="p-2 border-b border-gray-200">{JSON.stringify(props.itemData)}</div>
    };
    const dragItemIpts = [
      {
        inputType: 'AInput',
        dataKey: 'test',
        label: 'test',
        validator: [
          {
            required: true,
            message: 'test -- required',
            trigger: ['change']
          }
        ]
      },
      {
        inputType: 'AInput',
        dataKey: 'test1',
        label: 'test1',
        validator: [
          {
            message: 'test',
            trigger: ['change'],
            pattern: '/[a-z]+/'
          }
        ]
      }
    ];
    const dragItems = dragItemIpts.map((data, idx: number) => h(DragItem, {
      allowDrag: () => idx === 0,
      data,
      key: idx
    }, () => <div class="p-2 border-gray-200 border">{data.dataKey}</div>));

    const definition = reactive({
      name: 'test',
      fields: []
    });
    return () => (
      <div class="grid grid-cols-2 gap-2 p-4 h-screen">
        <DragList>
          {dragItems}
        </DragList>
        <DropList v-slots={dropListScopedSlot} v-model={[definition.fields, 'modelValue']} />
      </div>
    );
  }
});
