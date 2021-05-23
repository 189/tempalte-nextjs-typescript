export const splitWithSymbol = function(str: number | string, splitSymbol = ",", bit = 3) {
  const results: string[] = [];
  if (typeof str !== "string") {
    str = `${str}`;
  }
  let times = 0;

  while (true) {
    let begin = (times + 1) * -1 * bit;
    let end = times === 0 ? str.length : times * -1 * bit;
    let res = str.slice(begin, end);
    if (res === "") {
      break;
    }
    results.unshift(res);
    times++;
  }
  return results.join(splitSymbol);
};

export const formatPriceWithPoint = function(price: number | string, bit = 2) {
  if (typeof price === "string") {
    price = parseFloat(price);
  }
  const base = Math.pow(10, bit);
  return (Math.round(price * base) / base).toFixed(bit);
};

export const convertWithComma = (price: number) => {
  let result = "";
  let isMinus = false;
  if (price < 0) {
    price = Math.abs(price);
    isMinus = true;
  }

  const priceArr = (formatPriceWithPoint(price, 0) + "").split(".");
  const preStr = splitWithSymbol(priceArr[0]); // 加逗号显示
  result = `${preStr}`;

  return isMinus ? `-${result}` : result;
};

export const beautyHash = (hash: string, bit: number = 8) =>
  hash ? [hash.slice(0, bit), "......", hash.slice(0 - bit)].join("") : "";

export const isEmpty = (value: string): boolean => {
  return /^\s*$/.test(value);
};

export const trimHTML = (content: string) => {
  return content.replace(/<.*?>/g, "");
};

export const isUndefined = (value: any) => typeof value === "undefined";

export const isUndefinedOrEmpty = (value: string | undefined): boolean => {
  return typeof value === "undefined" || isEmpty(value);
};

// /fullnode.cn/newFriend/123  => /fullnode.cn/newFriend/:id => {id: 123}

// 该方法在对中文字符base64 会报 InvalidCharacterError
// 请使用 utoa 方法
// 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa
export const unsafeEncode = (str: string) => {
  str = typeof str === "string" ? str : JSON.stringify(str);
  return btoa(str);
};

// export const encode = (str: string) => btoa(encodeURIComponent(str));
export const unsafeDecode = (str: string) => {
  try {
    str = atob(str);
    str = JSON.parse(str);
  } catch (ex) {}
  return str;
};

// radix 返回的字符实体默认10进制，也可以选择16进制
export const stringToEntity = (str: string, radix = 0) => {
  let arr: string[] = [];
  for (let i = 0; i < str.length; i++) {
    arr.push((!radix ? "&#" + str.charCodeAt(i) : "&#x" + str.charCodeAt(i).toString(16)) + ";");
  }
  let tmp = arr.join("");
  return tmp;
};

export function htmlEntityEnCode(str: string) {
  let s = "";
  if (str.length === 0) {
    return "";
  }
  s = str.replace(/&/g, "&gt;");
  s = s.replace(/ </g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/  /g, "&nbsp;");
  s = s.replace(/\'/g, "'");
  s = s.replace(/\"/g, "&quot;");
  s = s.replace(/\n/g, " <br>");
  return s;
}
export function htmlEntityDeCode(str: string) {
  let s = "";
  if (str.length === 0) {
    return "";
  }
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/'/g, "'");
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/<br>/g, "\n");
  s = s.replace(/&cent;/g, "￠");
  s = s.replace(/&pound;/g, "£");
  s = s.replace(/&sect;/g, "§");
  s = s.replace(/&copy;/g, "©");
  s = s.replace(/&reg;/g, "®");
  s = s.replace(/&trade;/g, "™");
  s = s.replace(/&times;/g, "×");
  s = s.replace(/&divide;/g, "÷");
  return s;
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa
// ucs-2 string to base64 encoded ascii
export const utoa = (str: string) => {
  // encodeURIComponent 对URI进行编码，使用4个转义序列表示字符串中的UTF-8编码(转义 除 A-Z a-z 0-9 - _ . ! ~ * ' ( ) 外字符)
  return window.btoa(unescape(encodeURIComponent(str)));
};

// base64 encoded ascii to ucs-2 string
export const atou = (str: string) => {
  return decodeURIComponent(escape(window.atob(str)));
};

export const randomString = (length = 2): string => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const randomCapital = () => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return possible.charAt(Math.floor(Math.random() * possible.length));
};

export const phoneCloak = (phone: string | number): string => {
  phone = phone.toString();
  if (phone.length > 8) {
    return phone.replace(/(?<=\d{4})(\d)(?=\d{3})/g, "*");
  }
  return phone;
};

export const encode = utoa;
export const decode = atou;
