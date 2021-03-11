import { createApp } from 'vue';

import Antd from 'ant-design-vue';
import dragDrop from '@/components/drag-drop';
import App from './app';
import router from './router';
import './style/index.css';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(router).use(Antd).use(dragDrop.installer)
  .mount('#app');
