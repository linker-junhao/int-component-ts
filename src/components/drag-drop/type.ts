import { DragItemProps } from './DragItem';
import { DragListProps } from './DragList';
import DataCenter from './DataCenter';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dragDropDataCenter: DataCenter
  }
}

export { DragListProps, DragItemProps };
