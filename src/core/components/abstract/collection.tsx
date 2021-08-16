import Helpers from "@core/helpers";
import Network from "@core/mixins/network";
import Models from "@models"

export interface PropsCollection {
  onLoad: Function | undefined,
  externalConfig: object | undefined,
}
export class Collection extends Network() {
  get config() {
    return {};
  }
  get model() {
    return false;
  }
  onLoad: Function | undefined;
  public list: object = {};
  public externalConfig: object | undefined;

  constructor(props: PropsCollection) {
    super(props);
    this.onLoad = props?.onLoad;
    this.externalConfig = props?.externalConfig;

    return this.init();
  }

  private async init() {
    return new Promise(async (resolve: Function) => {
      if (this.model) {
        await this.load();
        resolve(this);
      }
      else throw Error(`model not found`);
    });
  }

  public async load() {
    const response = await this.request(this.config.load);
    if (response.status && response.data?.length) {
      this.list = {};
      await Promise.all(response.data.map((item) => {
        return new Promise(async (resolve) => {
          this.list[item.id] = await new this.model({ id: item.id, data: item });
          this.list[item.id].parent = this;
          this.list[item.id].prepareData()

          resolve(this.list[item.id])
        })
      }))
    }

    if (this.onLoad) {
      this.onLoad(this)
    }

    return response;
  }

  public add = async (data: any) => {
    await this.request(this.config.add, data)
    this.load();
  }

  public delete = async (id: number) => {
    await this.list[id].delete();
    this.load();
  }

  public deleteMultiple = async (ids: number[]) => {
    await this.request(this.config.deleteMultiple, { ids })
    this.load();
  }

  public render(...args: any[]) {
    return Object.keys(this.list).map((id: any) => this.list[id].render(...args))
  }
}

export default Collection;