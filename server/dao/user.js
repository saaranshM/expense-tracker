const promisify = require("util").promisify;
const lodash = require("lodash");
const db = require("../db/db");
const bcrypt = require("bcrypt");

class UserDAO {
  //Query to register new user//
  async createUser(email, password) {
    // cheking if email already exists
    const user = await db("user_login")
      .select(["user_email"])
      .where({ user_email: email });
    // throw an error if user exists
    if (user[0]) {
      throw new Error("user-exists");
    }
    // encrypting user passwords
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);
    // saving login details to db
    const [user_id] = await db("user_login")
      .insert({
        user_email: email,
        user_password: encryptedPassword,
      })
      .returning("user_id");

    return user_id;
  }

  // Query to add user profile //
  async addUserProfile(userId, firstName, lastName) {
    return await db("user_profile")
      .insert({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
      })
      .returning("user_id");
  }

  // Query to login user //
  async loginUser(email, password) {
    // get user from database
    const user = await db("user_login").select().where({ user_email: email });

    return user;
  }

  // Query to add token to user token array //
  async addTokenToArray(userId, token) {
    await db("user_login")
      .where({ user_id: userId })
      .update({
        tokens: db.raw("array_append(tokens, ?)", [token]),
      });
  }

  async addUserDetails(incomeDetails, bankDetails) {
    const trx = promisify(db.transaction);

    await trx("user_monthly_income").insert({
      incomeDetails,
    });
    await trx("user_bank_balance").insert({
      bankDetails,
    });

    await trx.commit();
  }
}

module.exports = new UserDAO();
