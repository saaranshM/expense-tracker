const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });

const jwtGenerator = (userId, type = "auth") => {
  const payload = {
    user: userId,
  };
  return type === "auth"
    ? jwt.sign(payload, process.env.ACCESS_JWT_SECRET, { expiresIn: "1 hour" })
    : jwt.sign(payload, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "1 hour",
      });
};

module.exports = jwtGenerator;
