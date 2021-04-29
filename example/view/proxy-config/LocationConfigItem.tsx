import { Form, Input } from 'ant-design-vue';
import { defineComponent, PropType, unref } from 'vue';

export interface ConfigItem {
  listen?: string
  location?: string
  proxyPass?: string
  serverName?: string
}

export default defineComponent({
  name: 'LocationConfigItem',
  data() {
    return {
      config: {} as ConfigItem
    };
  },
  props: {
    configItem: {
      type: Object as PropType<ConfigItem>,
      required: true
    }
  },
  mounted() {
    this.config = unref(this.configItem);
  },
  render() {
    return (
      <div>
        <Form>
          <Form.Item label="server_name">
            <Input value={this.config.serverName}></Input>
          </Form.Item>
          <Form.Item label="listen">
            <Input value={this.config.listen} onInput={(val) => {
              console.log(val);
              this.config.listen = val.data;
            }}></Input>
          </Form.Item>
          <Form.Item label="location">
            <Input value={this.config.location} onInput={(val) => {
              this.config.location = val.data;
            }}></Input>
          </Form.Item>
          <Form.Item label="proxyPass">
            <Input value={this.config.proxyPass} onInput={(val) => {
              this.config.proxyPass = val.data;
            }}></Input>
          </Form.Item>
        </Form>
      </div>
    );
  }
});
