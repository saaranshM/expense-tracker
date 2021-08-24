const knex = require("knex");
const knexfile = require("./knexfile");
require("dotenv").config();

console.log(process.env.NODE_ENV);

let db = knex(knexfile.development);

if (process.env.NODE_ENV === "test") {
  db = knex(knexfile.test);
}

module.exports = db;
