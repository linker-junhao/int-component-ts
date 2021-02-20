import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DropItem',
  props: {
    itemData: {
      type: [Object, Number, String, Array],
      required: true
    }
  }

});
