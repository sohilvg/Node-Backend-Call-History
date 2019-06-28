const knex = require("knex")({
    client: "postgres",
        connection:process.env.DATABASE_URL,
        pool: {
           min:2,
           max:10
        },
        ssl : true,
        debug: false
    });

module.exports = knex;