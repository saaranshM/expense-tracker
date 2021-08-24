const db = require("../db/db");

const addTokenToArray = async (userId, token) => {
  await db("user_login")
    .where({ user_id: userId })
    .update({
      tokens: db.raw("array_append(tokens, ?)", [token]),
    });
};

module.exports = addTokenToArray;
