const bcrypt = require("bcrypt");
const jwtGenerator = require("../../../utils/jwtGenerator");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_login").del();
  await knex("user_login").del();

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const encryptedPassword = await bcrypt.hash("test123456", salt);

  // Inserts seed entries
  const [userId] = await knex("user_login")
    .insert({
      user_email: "saaransh@test.com",
      user_password: encryptedPassword,
    })
    .returning("user_id");

  return knex("user_profile").insert({
    user_id: userId,
    first_name: "Saaransh",
    last_name: "Menon",
  });
};
