var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.IONIC_ENV;

useDefaultConfig[env].resolve.alias = {
  "@app/env": path.resolve(environmentPath(env))
};

function environmentPath(env) {
  var envP =   env !== 'prod' && env !== 'dev' ? '' : '.' + env;
  var filePath = './src/environments/environment' + envP + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  useDefaultConfig.prod.output['chunkFilename'] = "[name].[chunkhash].chunk.js";
  useDefaultConfig.dev.output['chunkFilename'] = "[name].[chunkhash].chunk.js";
  return useDefaultConfig;
};