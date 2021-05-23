const isLogined = require("../utils/token");
const privatePages = ["/profile"];

module.exports = async function checkAuth(ctx, next) {
  if (privatePages.some(url => ctx.request.url.startsWith(url))) {
    if (!isLogined(ctx)) {
      ctx.redirect("/login?from=" + encodeURIComponent(ctx.originalUrl));
      return;
    }
  }
  await next();
};
