exports.up = function (knex) {
  return knex.schema.createTable("user_transaction", (table) => {
    table
      .uuid("transaction_id")
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("user_id")
      .references("user_id")
      .inTable("user_login")
      .notNullable();

    table.decimal("transaction_amount").notNullable();
    table.string("transaction_name").notNullable();
    table.enu("transaction_type", ["desposit", "credit"]).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_transaction");
};
