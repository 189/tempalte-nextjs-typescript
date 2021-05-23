import * as React from "react";
import classnames from "classnames";

import { getLayout as getPrimaryLayout } from "components/PrimaryLayout";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function AccountLayout(props: Props) {
  return (
    <div className={classnames([styles.accountbox, "ui-center"])}>
      <section className={styles.slogan}>
        <h1 className="ui-font-medium">
          合约即服务
          <span className="ui-font-h4">Monoxide Contract as a Service</span>
        </h1>
        <h4 className="ui-font-medium">我们使用PREDA语言为您的DApp</h4>
        <h6 className="ui-color-tip">We use PREDA language to provide your DApp</h6>
        <h4 className="ui-font-medium">在Monoxide区块链上提供多个私有或公开的合约</h4>
        <h6 className="ui-color-tip">With multiple private or public contracts on the Monoxide blockchain</h6>
      </section>
      <section>{props.children}</section>
    </div>
  );
}

export const getLayout = page => getPrimaryLayout(<AccountLayout>{page}</AccountLayout>);
