import fetch from "isomorphic-unfetch";
import { Context } from "koa";
import cookie from "js-cookie";

export interface QueryOption {
  directive: string;
  ip: string;
  port: number | string;
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    return Promise.reject(response);
  }
}
interface Params {
  context?: Context;
  [props: string]: any;
}

export default class Fetcher {
  params: Params | undefined;

  constructor(params?: Params) {
    this.params = params;
  }

  get context() {
    return this.params?.context;
  }

  get ip() {
    return this.context?.ip;
  }

  get api() {
    return this.context ? `${this.context.protocol}//${this.context.hostname}/` : "/";
  }

  get cookies() {
    return this.context?.cookies || {};
  }

  fetch<T = {}>(service: string, options: any): Promise<T> {
    options = {
      credentials: "include",
      ...options,
      headers: options.headers,
    };
    const absoluteUrl = service.startsWith("http")
      ? service
      : this.api + (service.startsWith("/") ? service.slice(1) : service);
    return fetch(absoluteUrl, options)
      .then(checkStatus)
      .then(r => r.json());
  }

  formPost<T = {}>(service: string, options?: KV<any>): Promise<T> {
    return this.post<T>(service, options, true);
  }

  post<T = {}>(service: string, options: KV<any> = {}, isFormPost = false): Promise<T> {
    let { body, headers = {} } = options;
    let contentType: KV<any> = { "Content-Type": "application/json" };
    body = typeof body === "string" ? body : JSON.stringify(body);
    if (isFormPost) {
      contentType = {};
    }

    const concatOption: RequestInit = {
      credentials: "include",
      method: options.method || "post",
      headers: {
        ...contentType,
        ...headers,
        ...options.headers,
      },
      body,
    };
    const absoluteUrl = service.startsWith("http")
      ? service
      : this.api + (service.startsWith("/") ? service.slice(1) : service);

    console.log(absoluteUrl, concatOption);

    return fetch(absoluteUrl, concatOption)
      .then(checkStatus)
      .then(r => r.json());
  }
}
