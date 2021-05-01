# drag-drop
```js
  import DropList, { DragItem, DragList } from '@int-component/drag-drop';
  const dropListScopedSlot = {
    // slot item used for the data item render
    item: (props: any) => h('div', JSON.stringify(props.itemData))
  };

  // drag items with data bind on it
  const dragItems = dragItemIpts.map((ipt: any, idx: number) => h(DragItem, {
    data: ipt,
    key: idx
  }, () => ipt));

  // only fiedls needed
  // name property just use for dynamicForm, it's a experimental thing, just ignore it.
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
I used another experimental component DynamicForm, just ignore it, It's just a handy use for preview example.