const app = require("./app");
const config = require("./config");

async function startServer () {
    app.listen(config.PORT);
}

startServer();