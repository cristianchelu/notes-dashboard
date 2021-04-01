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
            filename: "store/dev.sqlite3",
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
    production: {
        client: "sqlite3",
        connection: {
            filename: "store/notes.sqlite3",
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