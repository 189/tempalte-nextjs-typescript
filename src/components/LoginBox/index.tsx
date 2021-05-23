import * as React from "react";
import { inject } from "mobx-react";
import { withRouter, Router } from "next/router";

import UserStore from "store/user";
import UserService from "services/User";

import styles from "./styles.module.scss";

export type LoginType = "password" | "code";

interface Props {
  type?: LoginType;
  router: Router;
  userStore?: UserStore;
}

interface State {
  username: string;
  password: string;
}

@inject("userStore")
class Login extends React.Component<Props, State> {
  state: State = {
    username: "",
    password: "",
  };

  handleChange = e => {
    const username = e.target.value;
    this.setState({ username });
  };

  onSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    UserService.doLogin({
      username: this.state.username,
      password: this.state.password,
    }).then(response => {
      alert("登录成功");
      const {
        data: { username, mobile },
      } = response;
      this.props.userStore?.initUser({
        username,
        mobile,
      });
      setTimeout(() => {
        const { from } = this.props.router.query;
        if (from) {
          this.props.router.push(from.toString());
          return;
        }
        this.props.router.push("/profile");
      }, 100);
    });
  };

  render() {
    return (
      <form action="/" method="post" onSubmit={this.onSubmit}>
        <input type="text" onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(Login);
