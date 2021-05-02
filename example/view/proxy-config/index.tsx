import { defineComponent } from 'vue';
import axios from 'axios';
import { Form, Input } from 'ant-design-vue';
import LocationConfig from './LocationConfig';

// axios.defaults.baseURL = 'http://localhost:8889';

export default defineComponent({
  name: 'ProxyConfig',
  mounted() {
    axios.request({
      url: '/proxy-config'
    }).then((res) => {
      console.log(res);
    });
  },
  data() {
    return {
      baseConfig: {
        configFilePath: ''
      }
    };
  },
  render() {
    return (<div class="grid grid-cols-3 gap-4">
      {/* <Form>
        <Form.Item label="nginx配置文件路径">
          <Input v-model={this.baseConfig.configFilePath}/>
        </Form.Item>
      </Form>
      <LocationConfig/> */}
      <div>
        <div></div>
      </div>
      <div class="col-span-2">

      </div>
    </div>);
  }
});
