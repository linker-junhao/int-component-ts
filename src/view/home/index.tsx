import definitionValidator from '@/components/dynamicForm/DefinitionPropValidator';
import DynamicForm from '@/components/dynamicForm/DynamicForm';
import {
  defineComponent, ref
} from 'vue';
import testDefinition from '@/components/dynamicForm/testDefinition';

import './style.css';
import DragList from '@/components/drag-drop/DragList';
import DragItem from '@/components/drag-drop/DragItem';
import DropList from '@/components/drag-drop/DropList';

export default defineComponent({
  name: 'Home',
  components: {
    DynamicForm
  },
  setup() {
    definitionValidator(testDefinition);
    return () => (
      <div class="grid grid-cols-3 gap-2 p-4 h-screen">
        <DropList/>
        <DragList>
          <DragItem data={{}}>123123</DragItem>
        </DragList>
        <div class="form-preview">
          <DynamicForm definition={testDefinition} />
        </div>
      </div>
    );
  }
});
