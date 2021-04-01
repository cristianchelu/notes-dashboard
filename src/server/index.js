const koaWebpack = require("koa-webpack");
const webpackConfig = require("../../webpack.config.dev");

const app = require("./app");
const config = require("./config");

async function startServer () {
    if (config.NODE_ENV == "development") {
        const webpack = await koaWebpack({ config: webpackConfig });
        app.use(webpack);
    }

    app.listen(config.PORT);
}

startServer();