import { defineComponent } from 'vue';

import './style.css';

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <div>
        <div class="config-edit">
        </div>
        <div class="form-preview">

        </div>
      </div>
    );
  }
});
