import { action, observable, makeObservable } from "mobx";
import { enableStaticRendering, MobXProviderContext } from "mobx-react";
import React, { useMemo } from "react";
import { UserInfo } from "services/User";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

let store: UserStore;

export interface InitialState extends Partial<UserInfo> {}

export default class UserStore {
  constructor() {
    makeObservable(this);
  }

  @observable username = "";
  @observable mobile = "";

  @action initUser = (data: InitialState | null) => {
    if (!data) {
      return;
    }
    this.username = data.username ?? "";
    this.mobile = data.mobile ?? "";
  };

  @action flush = () => {
    this.username = "";
    this.mobile = "";
  };
}

// 初始化 store, 同时获得一个 store 的单例
export function initialize(initialData: InitialState | null = null) {
  const _store = store ?? new UserStore();
  // If your page has Next.js data fetching methods that use a Mobx store, it will get hydrated here
  if (initialData) {
    _store.initUser(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") {
    return _store;
  }

  // Create the store once in the client
  if (!store) {
    store = _store;
  }
  return _store;
}

// 保证只返回同一个 store
export function makeSingleUserStore(initialState?: InitialState) {
  const store = useMemo(() => initialize(initialState), [initialState]);
  return store;
}

function useStores() {
  return React.useContext(MobXProviderContext);
}

export function useUserStore() {
  const allStore = useStores() as any;
  return allStore.userStore as UserStore;
}
