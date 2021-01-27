import { createApp } from 'vue'

import App from './app'
import router from './router'
import './style/index.css'

createApp(App).use(router).mount('#app')