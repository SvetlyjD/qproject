import Helpers from "@core/helpers";

interface ConfigInterface {
  request: any
  response: Function | undefined;
}

type Constructor = new (...args: any[]) => {};

class Default { }

function Main<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    async request(config: ConfigInterface, body: any | undefined = {}) {
      const { request, response } = config;
      const result = await Helpers.request(
        { ...request, body: { ...request.body, ...body } },
        response,
      );
      return result;
    }
  };
}

function Network(Base: any = Default) {
  return Main(Base)
}

export default Network;