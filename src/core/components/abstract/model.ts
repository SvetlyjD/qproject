import Network from "@core/mixins/network";

export interface PropsModel {
  id?: number,
  onLoad?: Function | undefined,
  data?: object | undefined,
}

export class Model extends Network() {
  get config(): any {
    return {};
  }
  get view() {
    return false;
  }

  constructor(props?: PropsModel) {
    super();
    this.id = props?.id;
    this.data = props?.data;
    this.onLoad = props?.onLoad
    return new Promise(async (resolve) => {
      if (props?.id && !props?.data) {
        await this.load()
      }
      resolve(this)
    })
  }

  async prepareData() {
    if (this.config.prepareData) {
      this.config.prepareData.forEach((item: any) => {
        this.data[item.name] = item.function();
      })
    }
  }

  async load() {
    const response = await this.request(this.config.load);
    if (response.status) {
      this.data = response.data
    }

    this.prepareData();
    if (this.onLoad) {
      this.onLoad(this)
    }

    return response;
  }

  async save() {
    return await this.request(this.config.save, this.data);
  }

  async delete() {
    return this.request(this.config.delete);
  }

  render(...args: any[]): JSX.Element | boolean {
    return this.view
  }
}

export default Model