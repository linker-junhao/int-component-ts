import axios from 'axios';
import { defineComponent } from 'vue';
import LocationConfigItem from './LocationConfigItem';

export default defineComponent({
  name: 'LocationConfig',
  mounted() {
    axios.request({
      url: '/proxy-config'
    }).then((res) => {
      console.log(res);
      this.list = res.data.data.list;
    });
  },
  data() {
    return {
      list: []
    };
  },
  render() {
    return (
      <div>
        {
          this.list.map((item, idx) => (
            <LocationConfigItem configItem={item} key={idx} />
          ))
        }
      </div>
    );
  }
});
