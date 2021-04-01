const {merge} = require("webpack-merge");

const commonConfig = require("./webpack.config.common");

const devConfig = merge(commonConfig, {
    mode: "production",
    devtool: "none",
});

module.exports = devConfig;