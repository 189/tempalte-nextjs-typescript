// Use the SentryWebpack plugin to upload the source maps during build step;
const cp = require("child_process");
const { checkEnvs } = require("./utils/env");

const basePath = "";
const {} = process.env;

const COMMIT_SHA = cp.execSync("git rev-parse HEAD", { encoding: "utf-8", timeout: 2000 });

checkEnvs();

const config = {
  compress: true,
  // https://www.nextjs.cn/docs/advanced-features/custom-server#disabling-file-system-routing
  useFileSystemPublicRoutes: true,
  images: {
    domains: [
      "gimg2.baidu.com",
      "aliyunimg.9ku.com",
      "ss1.bdstatic.com",
      "avatars.githubusercontent.com",
      "ss0.baidu.com",
    ],
  },

  poweredByHeader: false,

  env: {
    // Make the COMMIT_SHA available to the client so that Sentry events can be
    // marked for the release they belong to. It may be undefined if running
    // outside of Vercel
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
  },
  webpack: config => {
    return config;
  },
  basePath,

  /* typescript: {
    !! WARN !!
    Dangerously allow production builds to successfully complete even if
    your project has type errors.
    !! WARN !!
    ignoreBuildErrors: true,
  }, */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

module.exports = config;
