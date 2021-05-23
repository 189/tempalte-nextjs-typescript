export const isAndroid = () => {
  const ua = navigator.userAgent;
  return ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1;
};

export const isiOS = () => {
  const ua = navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};
