import definitionValidator from '@/components/dynamicForm/DefinitionPropValidator';
import DynamicForm from '@/components/dynamicForm/DynamicForm';
import {
  defineComponent, ref
} from 'vue';
import testDefinition from '@/components/dynamicForm/testDefinition';

import './style.css';

export default defineComponent({
  name: 'Home',
  components: {
    DynamicForm
  },
  setup() {
    definitionValidator(testDefinition);
    return () => (
      <div class="grid grid-cols-2 gap-2 p-4 h-screen">
        <div class="form-preview">
          <DynamicForm definition={testDefinition} />
        </div>
      </div>
    );
  }
});
