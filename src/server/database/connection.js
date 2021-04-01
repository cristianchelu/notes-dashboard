const knex = require("knex");
const config = require("../config");
const knexfile = require("../../../knexfile")[config.NODE_ENV];

module.exports = knex(knexfile);