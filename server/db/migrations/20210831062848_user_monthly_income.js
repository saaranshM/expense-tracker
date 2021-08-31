exports.up = function (knex) {
  return knex.schema.createTable("user_monthly_income", (table) => {
    table
      .uuid("user_id")
      .references("user_id")
      .inTable("user_login")
      .unique()
      .notNullable()
      .primary();

    table.bigInteger("monthly_income").notNullable();
    table.timestamp("pay_date").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_monthly_income");
};
