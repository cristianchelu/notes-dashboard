const Router = require("koa-router");
const NoteController = require("./controllers/NoteController");

const router = new Router();

router.get("/api", ctx => {
    ctx.body = "notes-dashboard";
});

router.get("/api/notes", NoteController.all);
router.post("/api/notes", NoteController.insert);

router.get("/api/notes/:id", NoteController.get);
router.put("/api/notes/:id", NoteController.update);
router.delete("/api/notes/:id", NoteController.delete);

module.exports = router;