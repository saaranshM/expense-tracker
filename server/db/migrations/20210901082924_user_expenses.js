exports.up = function (knex) {
  return knex.schema.createTable("user_expenses", (table) => {
    table
      .uuid("expense_id")
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.raw("uuid_generate_v4()"));

    table
      .uuid("user_id")
      .references("user_id")
      .inTable("user_login")
      .notNullable();

    table
      .uuid("transaction_id")
      .references("transaction_id")
      .inTable("user_transaction");

    table.uuid("payback_id").references("payback_id").inTable("user_payback");

    table.decimal("amount").notNullable();
    table.enum("type", ["you", "payback", "someone"]).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_expenses");
};
