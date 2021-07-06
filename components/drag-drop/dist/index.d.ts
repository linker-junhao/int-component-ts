import * as vue from 'vue';
import { App } from 'vue';

declare const _default: vue.DefineComponent<{
    allowDrop: {
        type: FunctionConstructor;
        default(): () => true;
    };
    modelValue: {
        type: ArrayConstructor;
        default(): never[];
    };
}, {
    listData: any[];
    itemKey: number;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    allowDrop: Function;
    modelValue: unknown[];
} & {}>, {
    allowDrop: Function;
    modelValue: unknown[];
}>;

declare const installer: {
    install: (app: App<any>) => void;
};

declare class DataCenter {
    private dragList;
    private TransferDataName;
    static instance: DataCenter | null;
    constructor();
    getData(e: DragEvent): any;
    setData(e: DragEvent, dragItem: any): void;
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $dragDropDataCenter: DataCenter;
    }
}

interface DragItemProps {
    allowDrag: Function | null;
    data: Object;
}
declare const DragItem: vue.DefineComponent<{
    allowDrag: {
        type: FunctionConstructor[];
        default(): null;
    };
    data: {
        type: ObjectConstructor;
        required: true;
    };
}, {
    draggable: vue.ComputedRef<any>;
    uid: vue.Ref<number>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    allowDrag: Function;
    data: Record<string, any>;
} & {}>, {
    allowDrag: Function;
}>;

interface DragListProps {
    allowDrag: Function;
}
declare const DragList: vue.DefineComponent<{
    allowDrag: {
        type: FunctionConstructor[];
        default(): () => true;
    };
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    allowDrag: Function;
} & {}>, {
    allowDrag: Function;
}>;

declare const DropItem: vue.DefineComponent<{
    itemData: {
        type: (ArrayConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[];
        required: true;
    };
}, unknown, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    itemData: unknown;
} & {}>, {}>;

export default _default;
export { DataCenter, DragItem, DragItemProps, DragList, DragListProps, DropItem, installer };
