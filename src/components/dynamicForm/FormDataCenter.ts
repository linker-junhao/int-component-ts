import { reactive } from 'vue';
import BindData from './BindDataInterface';

interface FormDatas {
  [key: string]: BindData
}


interface FormDataCenterType {
  formDatas: FormDatas;
  getByName(name: string): BindData;
  setData(name: string, data: BindData): FormDataCenterType;
}

// 数据中心，贯穿全局
class FormDataCenter implements FormDataCenterType {
  public formDatas: FormDatas;

  constructor() {
    this.formDatas = reactive({});
  }

  getByName(name: string) {
    return this.formDatas[name];
  }

  setData(name: string, data: BindData) {
    this.formDatas[name] = data;
    return this;
  }
}

export { FormDataCenter };

const globalFormDatas = new FormDataCenter();

export default globalFormDatas;
