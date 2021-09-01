exports.up = function (knex) {
  return knex.schema.createTable("user_payback", (table) => {
    table
      .uuid("payback_id")
      .unique()
      .notNullable()
      .primary()
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

    table.string("payback_to").notNullable();

    table.timestamp("payback_date").notNullable();
    table.decimal("payback_amount").notNullable();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_payback");
};
