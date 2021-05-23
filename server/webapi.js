const fetch = require("isomorphic-unfetch");
const { logger } = require("./logger");

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);
    return Promise.reject(error);
  }
}

module.exports = class Fetcher {
  constructor(params) {
    this.params = params;
  }

  get context() {
    return this.params ? this.params.context : undefined;
  }

  get ip() {
    return this.context ? this.context.ip : undefined;
  }

  get api() {
    return this.context ? `${this.context.protocol}//${this.context.hostname}/` : "/";
  }

  get cookies() {
    return this.context ? this.context.cookies : {};
  }

  fetch(service, options = {}) {
    options = {
      credentials: "include",
      headers: {
        ...this.cookies,
      },
      ...options,
    };
    const absoluteUrl = service.startsWith("http")
      ? service
      : this.api + (service.startsWith("/") ? service.slice(1) : service);
    return fetch(absoluteUrl, options)
      .then(checkStatus)
      .then(r => r.json());
  }

  post(service, body) {
    const options = {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        ...this.cookies,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    };
    const absoluteUrl = service.startsWith("http")
      ? service
      : this.api + (service.startsWith("/") ? service.slice(1) : service);

    return fetch(absoluteUrl, options)
      .then(checkStatus)
      .then(r => r.json());
  }
};
