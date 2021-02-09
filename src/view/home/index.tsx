import validator from '@/components/dynamicForm/DefinitionPropValidator';
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
    const genBasicDef = () => ref('{"fields": []}');
    validator(testDefinition);
    return () => (
      <div class="grid grid-cols-2 gap-2 p-4 h-screen">
        <div class="form-preview">
          <dynamic-form definition={testDefinition} />
        </div>
      </div>
    );
  }
});
