import { defineComponent, ref } from 'vue';

import './style.css';

export default defineComponent({
  name: 'Home',
  setup() {
    const val = ref<string>('2020');
    function handleChange(e: InputEvent) {
      val.value = e.data || '';
    }
    return () => (
      <div>
        <div class="config-edit">
          <a-textarea
            v-model={[val.value, 'value']}
            placeholder="textarea with clear icon"
            onChange={handleChange}
          />
        </div>
        <div class="form-preview">

        </div>
      </div>
    );
  }
});
