module.exports = {
    test: {
        client: "sqlite3",
        connection: {
            filename: ":memory:",
        },
        migrations: {
            directory: "src/server/database/migrations",
            tableName: "migrations",
        },
        seeds: {
            directory: "src/server/database/seeds",
        },
        useNullAsDefault: true,
        debug: false,
    },
    development: {
        client: "sqlite3",
        connection: {
            filename: "notes.sqlite3",
        },
        migrations: {
            directory: "src/server/database/migrations",
            tableName: "migrations",
        },
        seeds: {
            directory: "src/server/database/seeds",
        },
        useNullAsDefault: true,
        debug: false,
    },
};