exports.up = function(knex) {
    return knex.schema.createTable("notes", function(table) {
        table.increments("id");
        table.string("text").notNullable();
        table.float("x").notNullable();
        table.float("y").notNullable();
        table.datetime("createdAt").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("notes");
};