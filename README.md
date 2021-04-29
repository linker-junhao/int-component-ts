# INT-COMPONENT-TS
basically, this project is just for fun and collect some component/code used in daily dev work.

Not all code would be published to npm, just the part that I can ensure ok to use in dev will be published.

ok, that's all. rest of this readme is the usage doc of the component that I published. if you don't want to taste my terrible english, you can also clone this project to your machine and run the example part. 

## drag-drop
```jsx
  const dropListScopedSlot = {
    item: (props: any) => h('div', JSON.stringify(props.itemData))
  };

  const definition = reactive({
    name: 'test',
    fields: []
  });

  render() {
    return (
      <div class="grid grid-cols-3 gap-2 p-4 h-screen">
        <DropList v-slots={dropListScopedSlot} v-model={[definition.fields, 'modelValue']} />
        <DragList>
          {dragItems}
        </DragList>
        <div class="form-preview">
          <DynamicForm definition={definition} />
        </div>
      </div>
    );
  }
```
