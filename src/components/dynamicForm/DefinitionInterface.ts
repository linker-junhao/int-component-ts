interface DFormField {
  inputType: string,
  key: string,
  label: string
}

interface DFomrDefinition {
  fields: Array<DFormField>
}

export { DFormField, DFomrDefinition };

export default DFomrDefinition;
