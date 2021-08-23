const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (userId) => {
  const payload = {
    user: userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1 day" });
};

module.exports = jwtGenerator;
