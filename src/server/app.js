
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const router = require("./routes");
const config = require("./config");
const koaWebpack = require("koa-webpack");
const webpackConfig = require("../../webpack.config.dev");

async function configureApp () {
    const app = new Koa();
    app.use(bodyParser());
    
    if (config.NODE_ENV == "development") {
        const webpack = await koaWebpack({ config: webpackConfig });
        app.use(webpack);
    }

    if (config.NODE_ENV == "production") {
        const webpack = await koaWebpack({ config: webpackConfig });
        app.use(webpack);
    }

    app.use(router.routes());
    app.use(router.allowedMethods());
    return app;
}

module.exports = configureApp;