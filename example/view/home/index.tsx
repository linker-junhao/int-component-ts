import {
  defineComponent, h, reactive
} from 'vue';
import { RouterLink } from 'vue-router';

import './style.css';

export default defineComponent({
  name: 'Home',
  render() {
    return <div class="w-3/4 m-auto">
      <h1>
        int-components
      </h1>
      <ul>
        <li class="flex-row flex justify-between items-baseline">
          <RouterLink to={{ path: '/drag-drop' }}>
            drag-drop
          </RouterLink>
          <span class="text-gray-400 text-base">source-code: /example/view/drag-drop</span>
        </li>
      </ul>
    </div>;
  }
});
