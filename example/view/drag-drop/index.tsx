import {
  defineComponent, h, reactive
} from 'vue';

import './style.css';
import DropList, { DragItem, DragList } from '../../../components/drag-drop/index';

import DynamicForm, { generateFormItems, definitionValidator } from '../../../components/dynamic-form/index';
import testDefinition from '../../testDefinition';

export default defineComponent({
  name: 'DragDrop',
  components: {
    DynamicForm
  },
  setup() {
    definitionValidator(testDefinition);
    const dropListScopedSlot = {
      item: (props: any) => h('div', JSON.stringify(props.itemData))
    };
    const dragItemIpts = generateFormItems(testDefinition.fields);
    const dragItems = dragItemIpts.map((ipt: any, idx: number) => h(DragItem, {
      allowDrag: () => idx === 0,
      data: testDefinition.fields[idx],
      key: idx
    }, () => ipt));

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
        <div class="form-preview">
          <DynamicForm definition={definition} />
        </div>
      </div>
    );
  }
});
