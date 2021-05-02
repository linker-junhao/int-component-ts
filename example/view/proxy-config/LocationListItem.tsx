import { defineComponent, PropType } from 'vue';

export interface LocationListItemDataProp {
  name: string
  location: string
  proxyPass: string
}

export default defineComponent({
  name: 'LocationListItem',
  props: {
    itemData: {
      type: Object as PropType<LocationListItemDataProp>,
      required: true
    }
  },
  render() {
    return (
      <div>

      </div>
    );
  }
});
