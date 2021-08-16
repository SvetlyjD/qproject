import Helpers from "@core/helpers";
import Network from "@core/mixins/network";

export interface PropsModel {
  id: number,
  onLoad: Function | undefined,
  data: object | undefined,
}

export class Model extends Network() {
  get config() {
    return {};
  }
  get view() {
    return false;
  }
  public id!: number | undefined;
  public data!: any | undefined;
  onLoad: Function | undefined;

  constructor(props: PropsModel) {
    super();
    this.id = props?.id;
    this.data = props?.data;
    this.onLoad = props?.onLoad;
    return new Promise(async (resolve) => {
      if (props?.id && !props?.data) {
        await this.load()
      }
      resolve(this)
    })
  }

  private onFormSubmit({ body, data }) {
    Helpers.log(body, data)
  }

  public prepareData = async () => {
    if (this.config.prepareData) {
      this.config.prepareData.forEach((item) => {
        this.data[item.name] = item.function();
      })
    }
  }

  public async load() {
    const response = await this.request(this.config.load);
    if (response.status) {
      this.data = response.data;
    }

    this.prepareData();
    if (this.onLoad) {
      this.onLoad(this)
    }

    return response;
  }

  public save = async () => {
    return await this.request(this.config.save, this.data);
  }

  public delete = async () => {
    return this.request(this.config.delete);
  }

  public render(...args: any[]): JSX.Element | boolean {
    return this.view
  }
}

export default Model;