const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });
const client = require("../redis/redisInit");

const jwtGenerator = (userId, type = "auth") => {
  const payload = {
    user: userId,
  };
  const token =
    type === "auth"
      ? jwt.sign(payload, process.env.ACCESS_JWT_SECRET, { expiresIn: "30s" })
      : jwt.sign(payload, process.env.REFRESH_JWT_SECRET, {
          expiresIn: "7 days",
        });

  if (type !== "auth") {
    client.SETEX(userId, 7 * 24 * 60 * 60, token, (error, reply) => {
      if (error) {
        console.log(error.message);
        throw new Error("redis-set-error");
      }
    });
  }
  return token;
};

module.exports = jwtGenerator;
