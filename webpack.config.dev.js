const {merge} = require("webpack-merge");

const commonConfig = require("./webpack.config.common");

const devConfig = merge(commonConfig, {
    mode: "development",
    output: {
        hotUpdateMainFilename: "hot-update.[hash].json",
        hotUpdateChunkFilename: "hot-update.[hash].js",
    },
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    devtool: "cheap-module-eval-source-map",
});

module.exports = devConfig;