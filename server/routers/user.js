const Router = require("@koa/router");

const router = new Router();

router.post("/api/user", function(ctx) {
  const userinfo = ctx.cookies.userinfo;
  if (userinfo) {
    ctx.body = {
      code: 0,
      message: "ok",
      data: JSON.parse(userinfo),
    };
    return;
  }
  ctx.body = {
    code: 1,
    message: "Not Login",
    data: {},
  };
});

router.post("/api/dologin", function(ctx) {
  // const { username, password } = ctx.request.body;
  ctx.body = {
    code: 0,
    message: "ok",
    data: {},
  };
});

router.post("/api/dologout", function(ctx) {
  ctx.body = {
    code: 0,
    message: "ok",
    data: {},
  };
});

module.exports = router;
