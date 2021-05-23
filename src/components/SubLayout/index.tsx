import * as React from "react";
import clazz from "classnames";

import Siderbar from "components/Siderbar";

import styles from "./sublay.module.scss";

interface SubLayoutProps extends StyleComponent {
  children: React.ReactNode;
  activeMenu: string;
}

interface SubLayoutStats {}

export default class SubLayout extends React.PureComponent<SubLayoutProps, SubLayoutStats> {
  render() {
    const { className, activeMenu, children, style, ...rest } = this.props;
    return (
      <section className={clazz(["ui-center", styles.sublayout])} {...rest}>
        <Siderbar active={activeMenu} />
        <div className={clazz([styles.main])}>{children}</div>
      </section>
    );
  }
}
