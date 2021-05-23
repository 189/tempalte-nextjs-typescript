import * as React from "react";
import Head from "next/head";
import classnames from "classnames";
import Header from "components/Header";
import styles from "./lay.module.scss";
// import { themeStyle } from "ui/StyledComponents/theme";

interface LayoutProps {
  footer?: boolean;
  bgColor?: string;
  children: React.ReactNode;
}

interface LayoutStats {}

export default class PrimaryLayout extends React.Component<LayoutProps, LayoutStats> {
  static getLayout: React.ReactNode;

  componentWillUnmount() {
    console.log("primary layout did unmount");
  }

  componentDidMount() {
    console.log("primary layout did mount");
  }
  render() {
    const { footer = true, bgColor } = this.props;
    const style = bgColor
      ? {
          backgroundColor: bgColor,
        }
      : {};
    return (
      <div className={classnames([styles.layout, "ui-font-regular"])} style={style}>
        <Head>
          <script src="/js/icon.js" />
          <script src="https://ssl.captcha.qq.com/TCaptcha.js"></script>
        </Head>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export const getLayout = children => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};
