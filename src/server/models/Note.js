const Base = require("./Base");

class Note extends Base {
    static get tableName() {
        return "notes";
    }
}

module.exports = Note;