import definitionValidator from '@/components/dynamic-form/DefinitionPropValidator';
import DynamicForm from '@/components/dynamic-form/DynamicForm';
import {
  defineComponent, h, reactive
} from 'vue';

import './style.css';
import DragList from '@/components/drag-drop/DragList';
import DragItem from '@/components/drag-drop/DragItem';
import DropList from '@/components/drag-drop/DropList';
import { generateFormItems } from '@/components/dynamic-form/DFormPartialGenerator';
import testDefinition from '../../testDefinition';

export default defineComponent({
  name: 'Home',
  components: {
    DynamicForm
  },
  setup() {
    definitionValidator(testDefinition);
    const dropListScopedSlot = {
      item: (props: any) => h('div', JSON.stringify(props.itemData))
    };
    const dragItemIpts = generateFormItems(testDefinition.fields);
    const dragItems = dragItemIpts.map((ipt, idx) => h(DragItem, {
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
