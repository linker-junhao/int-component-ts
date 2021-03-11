import DataCenter from './DataCenter';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dragDropDataCenter: DataCenter
  }
}
