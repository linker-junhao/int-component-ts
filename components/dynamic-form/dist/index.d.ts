import * as vue from 'vue';
import { PropType, VNode } from 'vue';

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
interface BindData {
    [key: string]: any;
}

declare function strNotNulUndefEmpty(val: string): boolean;
declare function validField(field: DFormField): boolean;
declare function definitionValidator(val: DFormDefinition): boolean;

/**
 * stage1: 集成校验
 */
declare const DynamicForm: vue.DefineComponent<{
    definition: {
        type: PropType<DFormDefinition>;
        required: true;
        validator: typeof definitionValidator;
    };
}, {
    data: {};
    inputControls: vue.ComputedRef<vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[]>;
    validateRules: vue.ComputedRef<{}>;
}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<{
    definition: DFormDefinition;
} & {}>, {}>;

declare function devWarn(msg: string): void;

interface FormDatas {
    [key: string]: BindData;
}
interface FormDataCenterType {
    formDatas: FormDatas;
    getByName(name: string): BindData;
    setData(name: string, data: BindData): FormDataCenterType;
}
declare class FormDataCenter implements FormDataCenterType {
    formDatas: FormDatas;
    constructor();
    getByName(name: string): BindData;
    setData(name: string, data: BindData): this;
}
declare const globalFormDatas: FormDataCenter;

declare function generateFormItems(fields: Array<DFormField>, data?: BindData): Array<VNode>;
declare function generateFormRules(fields: Array<DFormField>): {};

export default DynamicForm;
export { BindData, DFormDefinition, DFormField, DFormFieldValidator, FormDataCenter, ValidatorTypeEnum, definitionValidator, devWarn, generateFormItems, generateFormRules, globalFormDatas, strNotNulUndefEmpty, validField };
