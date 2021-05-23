import * as React from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { withRouter, Router } from "next/router";
import cookie from "js-cookie";

import userStore from "store/user";
import { makeHomeLink } from "utils/links";
import userService from "services/User";
import isLogined from "utils/logined";

interface Props {
  router: Router;
  userStore?: userStore;
}

const HeaderStyled = styled.header`
  padding: 0 80px;
  height: 72px;
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #dadce3;
  .logo {
    cursor: pointer;
  }
  > section.ui-flex-divide-item {
    flex: none;
    width: auto;
    > h4 {
      margin-left: 15px;
    }
  }
  .menu {
    h4 {
      margin-right: 55px;
    }

    .line {
      width: 1px;
      background-color: #dadce3;
      height: 20px;
    }
  }

  a {
    text-decoration: none;
    color: #667494;
  }
`;

interface UserboxProps {
  avatar?: string;
  username: string;
  userStore: userStore;
}

@inject("userStore")
@observer
class Header extends React.Component<Props> {
  goHome = () => {
    if (isLogined()) {
      this.props.router.push(makeHomeLink());
      return;
    }
    this.props.router.push("/login");
  };

  get userStore() {
    return this.props.userStore as userStore;
  }

  get isLogined() {
    return this.userStore.username;
  }

  logout = () => {
    this.props?.userStore?.flush();
    userService.doLogout().then(() => {
      location.href = "/";
    });
  };

  componentDidMount() {
    const userinfo = cookie.get("userinfo");
    console.log(userinfo);
    if (userinfo) {
      userService.userInfo().then(response => {
        if (response.code === 0) {
          this.props.userStore?.initUser(response.data);
        }
      });
    }
  }

  render() {
    const { username } = this.userStore;
    return (
      <HeaderStyled className="ui-flex-divide">
        <section className="ui-flex-divide-item ui-flex-start-center ui-cursor" onClick={this.goHome}>
          <div className="logo">
            <Image src="/images/logo.png" width={40} height={48} objectFit="contain" />
          </div>
          <h4 className="ui-font-medium">Monoxide KaaS</h4>
        </section>
        <div className="ui-flex-divide-item ui-flex-end-center">
          {!this.isLogined && (
            <h4 className="ui-font-medium">
              <Link href="/login">登录</Link>
            </h4>
          )}
          {this.isLogined && (
            <div>
              {username} <span onClick={this.logout}>退出</span>
            </div>
          )}
        </div>
      </HeaderStyled>
    );
  }
}

export default withRouter(Header);
