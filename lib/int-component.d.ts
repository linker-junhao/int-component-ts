import { DefineComponent, PropType, ComputedRef, VNode, RendererNode, RendererElement, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, App, Ref } from 'vue';

declare class DataCenter {
    private dragList;
    private TransferDataName;
    getData(e: DragEvent): any;
    setData(e: DragEvent, dragItem: any): void;
}

declare enum ValidatorTypeEnum {
    string = "string",
    number = "number",
    boolean = "boolean",
    method = "method",
    regexp = "regexp",
    integer = "integer",
    float = "float",
    array = "array",
    object = "object",
    enum = "enum",
    date = "date",
    url = "url",
    hex = "hex",
    email = "email",
    any = "any"
}
interface DFormFieldValidator {
    required?: boolean;
    trigger?: Array<string>;
    message?: string;
    validator?: (rule: any, value: any) => boolean | Error | Array<Error>;
    pattern?: RegExp | string;
    enum?: Array<string>;
    len?: number;
    max?: number;
    min?: number;
    transform?: (value: any) => any;
    type?: ValidatorTypeEnum;
    whitespace?: boolean;
}
interface DFormField {
    inputType: string;
    dataKey: string;
    label: string;
    validator?: Array<DFormFieldValidator>;
}
interface DFormDefinition {
    name: string;
    fields: Array<DFormField>;
    form?: {};
}

declare function definitionValidator(val: DFormDefinition): boolean;

declare const _default: {
    DynamicForm: {
        DynamicForm: DefineComponent<{
            definition: {
                type: PropType<DFormDefinition>;
                required: true;
                validator: typeof definitionValidator;
            };
        }, {
            data: {};
            inputControls: ComputedRef<VNode<RendererNode, RendererElement, {
                [key: string]: any;
            }>[]>;
            validateRules: ComputedRef<{}>;
        }, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<{
            definition: DFormDefinition;
        } & {}>, {}>;
    };
    DragDrop: {
        installer: {
            install: (app: App<any>) => void;
        };
        DragItem: DefineComponent<{
            allowDrag: {
                type: FunctionConstructor[];
                default(): null;
            };
            data: {
                type: ObjectConstructor;
                required: true;
            };
        }, {
            draggable: ComputedRef<any>;
            uid: Ref<number>;
        }, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<{
            allowDrag: Function;
            data: Record<string, any>;
        } & {}>, {
            allowDrag: Function;
        }>;
        DragList: DefineComponent<{
            allowDrag: {
                type: FunctionConstructor[];
                default(): () => true;
            };
        }, void, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<{
            allowDrag: Function;
        } & {}>, {
            allowDrag: Function;
        }>;
        DropList: DefineComponent<{
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
        }, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<{
            allowDrop: Function;
            modelValue: unknown[];
        } & {}>, {
            allowDrop: Function;
            modelValue: unknown[];
        }>;
        DropItem: DefineComponent<{
            itemData: {
                type: (ObjectConstructor | ArrayConstructor | NumberConstructor | StringConstructor)[];
                required: true;
            };
        }, unknown, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<{
            itemData: unknown;
        } & {}>, {}>;
        DataCenter: typeof DataCenter;
    };
};

export default _default;
