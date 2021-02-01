interface DFormField {
  inputType: string,
  key: string,
  label: string
}

interface DFormDefinition {
  fields: Array<DFormField>
}

export { DFormField, DFormDefinition };

export default DFormDefinition;
