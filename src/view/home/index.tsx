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
    const val = ref('{"fields": []}');
    const defs = computed(() => {
      let ret;
      try {
        ret = JSON.parse(val.value);
      } catch (_) {
        ret = { fields: [] };
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
