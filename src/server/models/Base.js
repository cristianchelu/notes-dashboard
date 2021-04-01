const Model = require("objection").Model;
const db = require("../database/connection");

Model.knex(db);

module.exports = Model;