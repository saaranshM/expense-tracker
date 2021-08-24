const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const addTokenToArray = require("../utils/addTokenToArray");

class UserDAO {
  //Controller to register new user//
  async createUser(firstName, lastName, email, password) {
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

    // generate jwt token for user
    const token = jwtGenerator({ user_id: user_id });

    // call function to add token to tokens array
    await addTokenToArray(user_id, token);

    // saving personal user details to db
    await db("user_profile").insert({
      user_id: user_id,
      first_name: firstName,
      last_name: lastName,
    });
    // return user the token after registration
    return token;
  }

  // Controller to login user //

  async loginUser(email, password) {
    // get user from database
    const user = await db("user_login").select().where({ user_email: email });

    if (!user[0]) {
      throw new Error("not-found");
    }

    // check if password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].user_password
    );

    // throw invalid-credentails error if password is not valid
    if (!isPasswordValid) {
      throw new Error("invalid-credentials");
    }

    // generate jwt token for user
    const token = jwtGenerator({ user_id: user[0].user_id });

    // call function to add token to tokens array
    await addTokenToArray(user[0].user_id, token);

    // return user the token after registration
    return token;
  }
}

module.exports = new UserDAO();
