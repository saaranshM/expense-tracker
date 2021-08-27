const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });
const client = require("../redis/redisInit");

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
      (error, payload) => {
        if (error) return reject(new Error("invalid-token"));

        const user = payload.user;

        client.GET(user, (error, result) => {
          if (error) throw new Error("redis-get-error");

          if (result === refreshToken) resolve(user);
        });
      }
    );
  });
};

module.exports = verifyRefreshToken;
