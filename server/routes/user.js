const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const addTokenToArray = require("../utils/addTokenToArray");

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

    // call function to add token to tokens array
    await addTokenToArray(newUserCredntials[0].user_id, token);

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

router.post("/login", async (req, res) => {
  // destructuring request body to get email and password for login
  const { email, password } = req.body;
  try {
    // get user from database
    const user = await db("user_login").select().where({ user_email: email });

    // send not found if user is not found
    if (!user[0]) {
      return res.status(401).json({
        error: "not-found",
        message: "User does not exist",
      });
    }

    // check if password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].user_password
    );

    // send invalid cresentials if password is incorrect
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "invalid-credentails",
        message: "email or password is incorrect",
      });
    }

    // generate jwt token for user
    const token = jwtGenerator({ user_id: user[0].user_id });

    // call function to add token to tokens array
    await addTokenToArray(user[0].user_id, token);

    // send token if email is valid
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
