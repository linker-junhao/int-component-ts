import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <div id="nav" class="text-lg">
          <RouterLink to="/">Home</RouterLink> |
          <RouterLink to="/about">About</RouterLink>
        </div>
        <RouterView />
      </div>
    );
  }
});