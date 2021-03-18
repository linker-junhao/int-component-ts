interface DragItemProps {
    allowDrag: Function | null;
    data: Object;
}

interface DragListProps {
    allowDrag: Function;
}

declare class DataCenter {
    private dragList;
    private TransferDataName;
    getData(e: DragEvent): any;
    setData(e: DragEvent, dragItem: any): void;
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $dragDropDataCenter: DataCenter;
    }
}

export { DragItemProps, DragListProps };
