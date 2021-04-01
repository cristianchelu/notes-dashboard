const Router = require("koa-router");

const router = new Router();

router.get("/", ctx => {
    ctx.body = "notes-dashboard";
})

module.exports = router;