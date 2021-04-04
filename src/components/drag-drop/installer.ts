import { App } from 'vue';
import { DataCenter } from './DataCenter';

// eslint-disable-next-line import/prefer-default-export
export const installer = {
  install: (app: App<any>) => {
    app.config.globalProperties.$dragDropDataCenter = new DataCenter();
  }
};
