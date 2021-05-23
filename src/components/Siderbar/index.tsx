import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { makeAppLink, makeProfileLink } from "utils/links";
import clazz from "classnames";

// interface MenuItem {
//   text: string;
//   link: string;
//   active: boolean;
// }

interface MenusProps {
  // menuItem: MenuItem[]
  active: string;
}

const Menus: React.FunctionComponent<MenusProps> = (props: MenusProps) => {
  const { active, ...rest } = props;
  return (
    <ul {...rest}>
      <li
        className={clazz({
          active: active === "dapp",
          "ui-font-medium": active === "dapp",
        })}
      >
        <h2>
          <Link href={makeAppLink()}>其他菜单</Link>
        </h2>
      </li>
      {/* <li
        className={clazz({
          active: active === "asset",
          "ui-font-medium": active === "asset",
        })}
      >
        <h2>资金管理</h2>
      </li> */}
      <li
        className={clazz({
          active: active === "profile",
          "ui-font-medium": active === "profile",
        })}
      >
        <h2>
          <Link href={makeProfileLink()}>个人中心</Link>
        </h2>
      </li>
    </ul>
  );
};

export default styled(Menus)`
  width: 150px;
  text-align: right;
  border-right: 1px solid transparent;
  border-image: linear-gradient(transparent, 10%, #000, 90%, transparent) 1 1;
  padding: 127px 0;
  .active {
    color: #000;
    position: relative;
    &::after {
      content: "";
      background-color: #000;
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      top: 50%;
      right: -4px;
      transform: translateY(-50%);
    }
  }
  li {
    margin-bottom: 40px;
    padding-right: 20px;
    h2 {
      font-size: 18px;
    }
  }
`;
