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

export default DFormDefinition;
export { BindData, DFormDefinition, DFormField, DFormFieldValidator, ValidatorTypeEnum };
