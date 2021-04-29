import { createApp } from 'vue';

import Antd from 'ant-design-vue';
import { installer as dragDropInstaller } from '../components/drag-drop/dist';
import App from './app';
import router from './router';
import './mockjs';
import './style/index.css';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(router).use(Antd).use(dragDropInstaller)
  .mount('#app');
