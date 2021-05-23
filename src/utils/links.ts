// App Link
export function makeContractDetailLink(id: string, dapp: string, name: string) {
  return `/dapp/contract/${id}?dapp=${dapp}&name=${name}`;
}

export function makeAppDetailLink(id: string) {
  return `/dapp/detail/${id}`;
}

export function makeAppEditLink(id: string) {
  return `/dapp/edit/${id}`;
}

export function makeAppLink() {
  return "/dapp";
}

// Profile Link
export function makeProfileLink() {
  return "/profile";
}

// Home link
export function makeHomeLink() {
  return "/dapp";
}

// 404 link
export function make404Link() {
  return "/404";
}

export function makePasscodeChangeAuth() {
  return "/profile/passcode-change";
}

export function makePasscodeChangeLink(code: string) {
  return "/profile/passcode-change/change?code=" + code;
}

export function makePhoneChangeAuth() {
  return "/profile/phone-change";
}

export function makePhoneBinderLink(code: string) {
  return "/profile/phone-change/bind?code=" + code;
}

export function makeCertFileAuth() {
  return "/profile/cert";
}

export function makeCertFileLink() {
  return "/profile/cert/download";
}

export function makeBreadCrumb() {
  return "/login?" + encodeURIComponent(location.href);
}
