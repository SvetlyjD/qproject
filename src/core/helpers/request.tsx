import fetch_ from "./fetch";
import localforages from '@configs/localforages'
import Store from "./store";

type Method = "POST" | "GET";

export interface RequestConfigInterface {
  method: Method,
  url: string,
  body: any,
  ignoreDisablePreloader: boolean,
}

export async function request(config: RequestConfigInterface, response: Function | undefined) {
  let user = await Store.get(localforages.user)
  if (user) {
    user = JSON.parse(user);
  }

  let body = { ...config.body, token: user?.token?.token }

  let result = await fetch_({ ...config, body }, global.setPreloader);
  if (response) {
    result = await response(result)
  }
  return result;
}

export default request;