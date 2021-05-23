module.exports = function isLogined(ctx) {
  const logined = ctx.cookies.get("userinfo");
  return !!logined;
};
