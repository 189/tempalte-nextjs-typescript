// https://github.com/koajs/router/blob/HEAD/API.md
// https://github.com/koajs/koa/wiki#middleware
const next = require("next");
const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const logined = require("./utils/token");

const { logger, shutdown } = require("./logger");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

const Auth = require("./middlewares/checkAuth");
const UserRouter = require("./routers/user");

const server = new Koa();
const router = new Router();

app.prepare().then(() => {
  // https://github.com/koajs/bodyparser
  server.use(bodyParser());
  server.use(Auth);
  server.use(UserRouter.routes());
  server.use(router.routes());

  router.get("/login", async ctx => {
    if (!logined(ctx)) {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      return;
    }
    ctx.redirect("/profile");
  });

  router.get("(.*)", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  // usual error handler
  server.on("error", (err, ctx) => {
    if (err.code === "EPIPE" || err.code === "ECONNRESET") {
      logger.warn("Server on error: " + err.code);
      return;
    }
    readyToExit(err);
  });

  // the rest of your app
  server.listen(port, () => {
    logger.info(`> Ready on http://localhost:${port}`);
  });
});

process.on("uncaughtException", function(err) {
  readyToExit("[uncaughtException]-" + err);
});

process.on("unhandledRejection", function(err) {
  readyToExit("[unhandledRejection]-" + err);
});

function readyToExit(err) {
  logger.fatal(err);
  shutdown(() => {
    process.exit(1);
  });
}
