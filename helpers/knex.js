const config = require('../db/knexfile');
//expose knex connection object;
const knex = require("knex")
module.exports = knex;