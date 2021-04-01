const configureApp = require("./app");
const config = require("./config");
const open = require("open");

async function startServer() {
    const app = await configureApp();
    app.listen(config.PORT);
    if (config.NODE_ENV == "development") {
        open(`http://localhost:${config.PORT}`);
    }
}

startServer();