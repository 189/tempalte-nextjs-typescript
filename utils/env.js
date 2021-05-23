const chalk = require("chalk");

function red(message) {
  console.log(chalk.red(message));
}

function cyan(message) {
  console.log(chalk.cyan(message));
}

function padding(message, padding = 4) {
  return " ".repeat(padding) + message;
}

function checkEnvs() {
  const envs = [];

  let missing = false;

  console.log("\n");
  console.log("检查环境变量设置");
  envs.forEach(env => {
    if (typeof process.env[env] !== "undefined") {
      cyan(padding(`${env} : ${process.env[env]}`));
    } else {
      red(padding(`${env} : ${process.env[env]}`));
      missing = true;
    }
  });

  console.log("\n");

  if (missing) {
    process.exit(0);
  }
}

module.exports = {
  checkEnvs,
};
