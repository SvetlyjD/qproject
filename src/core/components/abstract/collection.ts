import Network from "@core/mixins/network";

export interface PropsCollection {
  onLoad: Function | undefined,
  externalConfig: any | undefined,
}
export class Collection extends Network() {
  get config(): any {
    return {};
  }
  get model(): any {
    return false;
  }
  onLoad: Function | undefined;
  list: any = {};
  externalConfig: any | undefined;

  constructor(props?: PropsCollection) {
    super(props);
    this.onLoad = props?.onLoad;
    this.externalConfig = props?.externalConfig;

    return this.init(props);
  }

  async init(props?: PropsCollection) {
    return new Promise(async (resolve: Function) => {
      if (this.model) {
        await this.load();
        resolve(this);
      }
      else throw Error(`model not found`);
    });
  }

  async load() {
    const response = await this.request(this.config.load);
    if (response.status && response.data?.length) {
      this.list = {};
      await Promise.all(response.data.map((item: any) => {
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

  async add(data: any) {
    await this.request(this.config.add, data)
    this.load();
  }

  async delete(id: number) {
    await this.list[id].delete();
    this.load();
  }

  async deleteMultiple(ids: number[]) {
    await this.request(this.config.deleteMultiple, { ids })
    this.load();
  }

  render(...args: any[]) {
    return Object.keys(this.list).map((id: any) => this.list[id].render(...args))
  }
}

export default Collection;