import { AppProps } from "next/app";
import { Provider } from "mobx-react";
import { makeSingleUserStore } from "store/user";
import PrimaryLayout from "components/PrimaryLayout";

import "scss/index.scss";
import "./global.scss";

export default function MyApp(app: AppProps) {
  const { Component, pageProps } = app;
  const userStore = makeSingleUserStore(pageProps.initialState);
  const getLayout = (Component as any).getLayout || (page => <PrimaryLayout children={page} />);
  return <Provider userStore={userStore}>{getLayout(<Component {...pageProps} />)}</Provider>;
}
