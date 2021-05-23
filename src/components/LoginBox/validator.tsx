import classnames from "classnames";

import Icon from "ui/MyIcon";
import { ValidItem } from "ui/CustomInput";

import styles from "./styles.module.scss";

export function makeEmptyValidatorItem(fieldname: string): ValidItem {
  return {
    func: (value: string) => value.length > 0,
    errorMsg: (
      <div className={classnames([styles.errorTip, "ui-flex-start-center"])}>
        {/* <Icon type="close" size={16} /> */}
        <span>{fieldname}不能为空</span>
      </div>
    ),
  };
}

export const telephoneValidor: ValidItem[] = [
  makeEmptyValidatorItem("手机号"),
  {
    func: (value: string) => /^1\d{10}$/.test(value),
    errorMsg: (
      <div className={classnames([styles.errorTip, "ui-flex-start-center"])}>
        {/* <Icon type="close" size={16} /> */}
        <span>手机格式有误</span>
      </div>
    ),
  },
];

export const emailValidator: ValidItem[] = [
  makeEmptyValidatorItem("邮箱"),
  {
    func: (value: string) => /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value),
    errorMsg: (
      <div className={classnames([styles.errorTip, "ui-flex-start-center"])}>
        {/* <Icon type="close" size={16} /> */}
        <span>邮箱格式不正确</span>
      </div>
    ),
  },
];

export const passwordValidator: ValidItem[] = [
  makeEmptyValidatorItem("密码"),
  {
    func: (value: string) => value.length <= 20 && value.length >= 6,
    errorMsg: (
      <div className={classnames([styles.errorTip, "ui-flex-start-center"])}>
        <Icon type="close" size={16} />
        <span>需要 6-20个字符</span>
      </div>
    ),
  },
  {
    func: (value: string) => /^[a-zA-Z~!@#$%^&\d]+$/.test(value),
    errorMsg: (
      <div className={classnames([styles.errorTip, "ui-flex-start-center"])}>
        <Icon type="close" size={16} />
        <span>只能包含字母，数字, 以及标点符号</span>
      </div>
    ),
  },
  {
    func: (value: string) => /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]/.test(value),
    errorMsg: (
      <div className={classnames([styles.errorTip, "ui-flex-start-center"])}>
        <Icon type="close" size={16} />
        <span>字母，数字，至少包含2种</span>
      </div>
    ),
  },
];
