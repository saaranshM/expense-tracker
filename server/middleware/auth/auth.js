const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });

const auth = (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");
    if (!tokenHeader) {
      throw new Error();
    }
    const token = tokenHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    console.log(payload);

    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      error: "invalid-token",
      message: "token is invalid",
    });
  }
};

module.exports = auth;
