exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS citext`);

  return knex.schema
    .createTable("user_login", (table) => {
      table
        .uuid("user_id")
        .unique()
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("user_email").notNullable().unique();
      table.string("user_password").notNullable();
      table.boolean("is_active").notNullable().defaultTo(true);
      table
        .specificType("tokens", "VARCHAR(255)[]")
        .notNullable()
        .defaultTo(knex.raw("array[]::VARCHAR(255)[]"));
      table.timestamps(true, true);
    })
    .createTable("user_profile", (table) => {
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

exports.down = async function (knex) {
  await knex.schema.dropTable("user_profile").dropTable("user_login");
};
