exports.up = function (knex) {
  return knex.schema.createTable("user_profile", (table) => {
    table
      .uuid("user_id")
      .references("user_id")
      .inTable("user_login")
      .unique()
      .notNullable()
      .primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable().defaultTo("");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_profile");
};
