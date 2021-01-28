import { defineComponent } from 'vue';

import './style.css';

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <div class="test-text test-text-green">
        21234
      </div>
    );
  }
});
