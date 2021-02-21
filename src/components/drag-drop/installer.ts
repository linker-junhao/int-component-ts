import { App } from 'vue';
import DataCenter from './DataCenter';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dragDropDataCenter: DataCenter
  }
}

export default {
  install: (app: App<any>) => {
    app.config.globalProperties.$dragDropDataCenter = new DataCenter();
  }
};
