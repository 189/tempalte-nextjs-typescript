module.exports = {
  apps: [
    {
      name: "template-nextjs-typescript",
      script: "server/server.koa.js",
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      autorestart: true,
      // https://pm2.keymetrics.io/docs/usage/environment/
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
      // https://pm2.keymetrics.io/docs/usage/cluster-mode/
      instances: "max",
      // default to true, [enable/disable source map file]
      source_map_support: true,
      // Make a difference instance between process
      // See https://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables
      instance_var: "INSTANCE_ID",
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      log_file: "logs/combined.log",
      time: true,
      merge_logs: true,
      max_memory_restart: "500M",
    },
  ],
  deploy: {
    production: {},
  },
};
