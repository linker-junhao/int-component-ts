import validator from '@/components/dynamicForm/DefinitionPropValidator';
import DynamicForm from '@/components/dynamicForm/DynamicForm';
import {
  computed, defineComponent, ref
} from 'vue';

import './style.css';

export default defineComponent({
  name: 'Home',
  components: {
    DynamicForm
  },
  setup() {
    const genBasicDef = () => ref('{"fields": []}');
    const val = genBasicDef();
    const defs = computed(() => {
      let ret;
      try {
        ret = JSON.parse(val.value);
        if (!validator(ret)) {
          ret = JSON.parse(genBasicDef().value);
        }
      } catch (_) {
        ret = JSON.parse(genBasicDef().value);
      }
      return ret;
    });
    return () => (
      <div class="grid grid-cols-2 gap-2 p-4 h-screen">
        <div class="config-edit">
          <a-textarea
            v-model={[val.value, 'value']}
            placeholder="config at here"
            autoSize={{ minRows: 20, maxRows: 80 }}
          />
        </div>
        <div class="form-preview">
          <dynamic-form definition={defs} />
        </div>
      </div>
    );
  }
});
