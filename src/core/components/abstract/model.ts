import Log from "@core/helpers/log";
import Network from "@core/mixins/network";
import EntityBase from "./entity";

export interface PropsModel<Entity extends EntityBase> {
  id?: number
  onInit?: Function
  onLoad?: Function
  getExternalStore?: () => any
  data?: Entity
}

export class Model<Entity extends EntityBase> extends Network() {
  get config(): any {
    return {};
  }
  get view() {
    return false;
  }

  data?: Entity
  #getExternalStore?: Function;

  constructor(props?: PropsModel<Entity >) {
    super();
    if (props) {
      this.id = props.data[props.data?.id_field]
      this.data = props.data
      this.data?.id = this.id;
      this.onLoad = props.onLoad
      this.#getExternalStore = props.getExternalStore
    }

    this.init(props).then(() => {
      if (props?.onInit) {
        props.onInit(this)
      }
    })
  }

  getExternalStore() {
    if (this.#getExternalStore) {
      return this.#getExternalStore()
    }
    return {}
  }

  async init(props?: PropsModel<Entity>) {
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

  async load(config: any = this.config.load) {
    const response = await this.request(config);
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

export default Model;
