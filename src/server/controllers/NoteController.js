const Note = require("../models/Note");

class NoteController {
    async all(ctx) {
        const data = await Note.query();
        ctx.body = { data };
    }

    async get(ctx) {
        const data = await Note.query().where({ id: ctx.params.id });
        ctx.body = { data };
    }

    async insert(ctx) {
        let data = null;
        const { body } = ctx.request;
        data = await Note.query().insert(body);
        ctx.body = { data };
    }

    async update(ctx) {
        let data = null;
        const { body } = ctx.request;
        if (body.id) {
            data = await Note.query().patchAndFetchById(body.id, body);
        }
        ctx.body = { data };
    }

    async delete(ctx) {
        await Note.query().delete().where({ id: ctx.params.id });
        ctx.body = {};
    }
}

module.exports = new NoteController();