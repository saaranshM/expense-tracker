const db = require("knex")({
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "root",
      database: "expense_tracker",
    },
  }); 
  
  module.exports = db;