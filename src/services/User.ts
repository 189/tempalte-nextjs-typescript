import cookie from "js-cookie";
// import Fetcher from "./webapi";
import { USERINFO_COOKIE_KEY } from "utils/constants";
import { DAY } from "utils/time";

export interface UserInfo {
  username: string;
  mobile: string;
}

type CommonResponseWithUserInfo = CommonResponse<UserInfo>;

export default class User {
  static userInfo(): Promise<CommonResponseWithUserInfo> {
    return new Promise(resolve => {
      setTimeout(() => {
        const userInfo = cookie.get(USERINFO_COOKIE_KEY);
        resolve({
          code: 0,
          message: "ok",
          data: userInfo ? JSON.parse(userInfo) : {},
        });
      }, 1000);
    });
    // return new Fetcher().post<CommonResponseWithUserInfo>(
    //   process.env.NEXT_PUBLIC_PORTAL_WEB_SERVER + "/api/user",
    //   {},
    //   true
    // );
  }

  static doLogin(params: {
    username: string;
    password: string;
  }): Promise<CommonResponse<{ username: string; mobile: string }>> {
    return new Promise(resolve => {
      setTimeout(() => {
        const { username = "someone" } = params;
        const userInfo = JSON.stringify({ username, mobile: "654321" });
        console.log("set userInfo", userInfo);
        cookie.set(USERINFO_COOKIE_KEY, userInfo, {
          expires: DAY * 3,
        });
        console.log("get userInfo", cookie.get(USERINFO_COOKIE_KEY));
        resolve({
          code: 0,
          message: "ok",
          data: {
            username,
            mobile: "654321",
          },
        });
      }, 1000);
    });
    // return new Fetcher().post<CommonResponseWithUserInfo>(
    //   process.env.NEXT_PUBLIC_PORTAL_WEB_SERVER + "/api/dologin",
    //   { body: JSON.stringify(params) },
    //   false
    // );
  }

  static doLogout() {
    return new Promise(resolve => {
      setTimeout(() => {
        cookie.remove(USERINFO_COOKIE_KEY);
        resolve({
          code: 0,
          message: "ok",
          data: {},
        });
      }, 1000);
    });
    // return new Fetcher()
    //   .post<CommonResponse>(process.env.NEXT_PUBLIC_PORTAL_WEB_SERVER + "/api/dologout")
    //   .then(response => {
    //     if (response.code === 0) {
    //       cookie.remove(USERINFO_COOKIE_KEY);
    //     }
    //     return response;
    //   });
  }
}
