import { App } from 'vue';
import DataCenter from './DataCenter';

export default {
  install: (app: App<any>) => {
    app.config.globalProperties.$dragDropDataCenter = new DataCenter();
  }
};
