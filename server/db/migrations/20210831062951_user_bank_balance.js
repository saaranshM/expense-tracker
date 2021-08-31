exports.up = function (knex) {
  return knex.schema.createTable("user_bank_balance", (table) => {
    table
      .uuid("user_id")
      .references("user_id")
      .inTable("user_login")
      .unique()
      .notNullable()
      .primary();
    table.bigInteger("bank_balance").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_bank_balance");
};
