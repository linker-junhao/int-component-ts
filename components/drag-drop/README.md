# drag-drop
this component is a light wrapper for drag/drop operate based on vue3, you can trans data by drag/drop easily with this component.

## attention
there is a big gap between version 1 and version 2.
at version 1, the data transfered will be cut off the reference relation from it's origin data by `JSON.parse(JSON.stringify(data))`, and it caused a error that the data can't be stringify or parse by JSON, and it's also limited the creation we developer use it.
## use
```js
import {
  defineComponent, h, reactive
} from 'vue';

import './style.css';
import DropList, { DragItem, DragList } from '@int-component/drag-drop';

export default defineComponent({
  name: 'DragDrop',
  setup() {
    const dropListScopedSlot = {
      item: (props: any) => h('div', JSON.stringify(props.itemData))
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
    }, () => <div>{data.dataKey}</div>));

    const definition = reactive({
      name: 'test',
      fields: []
    });
    return () => (
      <div class="grid grid-cols-3 gap-2 p-4 h-screen">
        <DropList v-slots={dropListScopedSlot} v-model={[definition.fields, 'modelValue']} />
        <DragList>
          {dragItems}
        </DragList>
      </div>
    );
  }
});

```

## todo
[ ] add all drag/drop event callback  
[ ] multi data items trans  