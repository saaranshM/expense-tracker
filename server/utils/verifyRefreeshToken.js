const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });
const client = require("../redis/redisInit");

const verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = await jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );
    client.GET(user, (error, result) => {
      if (error) {
        console.log(error.message);
        throw new Error("redis-get-error");
      }

      if (refreshToken === result) return payload.user;
      throw new Error("invalid-token");
    });
  } catch (error) {
    throw new Error("invalid-token");
  }
};

module.exports = verifyRefreshToken;
