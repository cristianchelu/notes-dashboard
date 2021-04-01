
const path = require("path");
const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const router = require("./routes");
const config = require("./config");
const koaWebpack = require("koa-webpack");
const webpackConfig = require("../../webpack.config.dev");

const BUILD_PATH = path.join(__dirname, "..", "..", "build");

async function configureApp () {
    const app = new Koa();
    app.use(bodyParser());
    
    if (config.NODE_ENV == "development") {
        app.use(logger());
        const webpack = await koaWebpack({ config: webpackConfig });
        app.use(webpack);
    }

    if (config.NODE_ENV == "production") {
        app.use(serve(BUILD_PATH));
    }

    app.use(router.routes());
    app.use(router.allowedMethods());
    return app;
}

module.exports = configureApp;