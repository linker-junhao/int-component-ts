import DFormDefinition from './DefinitionInterface';

const testDefinition: DFormDefinition = {
  name: 'test',
  fields: [
    {
      inputType: 'AInput',
      dataKey: 'test',
      label: 'test',
      validator: [
        {
          required: true,
          message: 'test -- required',
          trigger: ['change']
        }
      ]
    },
    {
      inputType: 'AInput',
      dataKey: 'test1',
      label: 'test1',
      validator: [
        {
          message: 'test',
          trigger: ['change'],
          validator: (rule, value) => {
            console.log(value);
            return true;
          }
        }
      ]
    }
  ]
};

export default testDefinition;
