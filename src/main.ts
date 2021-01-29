import { createApp } from 'vue';

import antDesign from 'ant-design-vue'; // 加载 JS
import 'ant-design-vue/lib/style'; // 加载 CSS
import App from './app';
import router from './router';
import './style/index.css';

// import 'ant-design-vue/lib/date-picker/style';         // 加载 LESS

createApp(App).use(router).use(antDesign).mount('#app');
