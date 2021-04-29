# drag-drop
```jsx
  const dropListScopedSlot = {
    // slot item used for the data item render
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
I used another experiment component DynamicForm, just ignore it, It's just a handy use for preview example.