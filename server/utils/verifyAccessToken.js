const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });
const client = require("../redis/redisInit");

const verifyAccessToken = async (accessToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET, (error, payload) => {
      if (error) return reject(new Error("invalid-token"));

      const user = payload.user;

      resolve(user);
    });
  });
};

module.exports = verifyAccessToken;
