const configureApp = require("./app");
const config = require("./config");

async function startServer() {
    const app = await configureApp();
    app.listen(config.PORT);
}

startServer();