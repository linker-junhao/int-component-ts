import { defineComponent, PropType } from 'vue';
import { LocationListItemDataProp } from './LocationListItem';

export interface ServerListItemDataProp {
  name: string
  serverName: string
  listen: string
  locations: LocationListItemDataProp[]
}

export default defineComponent({
  name: 'ServerListItem',
  props: {
    itemData: {
      type: Object as PropType<ServerListItemDataProp>,
      required: true
    }
  },
  render() {
    return (
      <div>
        <div></div>
      </div>
    );
  }
});
