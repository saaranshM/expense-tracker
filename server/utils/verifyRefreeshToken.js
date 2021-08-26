const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });

const verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = await jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );
    return payload.user_id;
  } catch (error) {
    throw new Error("invalid-token");
  }
};

module.exports = verifyRefreshToken;
