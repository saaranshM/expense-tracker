const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/register", async (req, res) => {
  // destructuring  request body
  const { email, password, firstName, lastName } = req.body;
  try {
    // cheking if email already exists
    const user = await db("user_login")
      .select(["user_email"])
      .where({ user_email: email });

    // return result as user exists if user exists
    if (user[0]) {
      return res.status(401).json({
        error: "user-exists",
        message: "user already exists",
      });
    }

    // encrypting user passwords
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // saving loging details to db
    const newUserCredntials = await db("user_login")
      .insert({
        user_email: email,
        user_password: encryptedPassword,
      })
      .returning(["user_id"]);

    // generate jwt token for user
    const token = jwtGenerator({ user_id: newUserCredntials[0].user_id });

    await db("user_login")
      .where({ user_id: newUserCredntials[0].user_id })
      .update({
        tokens: db.raw("array_append(tokens, ?)", [token]),
      });

    // saving personal user details to db
    await db("user_profile").insert({
      user_id: newUserCredntials[0].user_id,
      first_name: firstName,
      last_name: lastName,
    });

    // send user the token after registration
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
