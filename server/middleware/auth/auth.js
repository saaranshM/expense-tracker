const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });

const auth = (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");
    if (!tokenHeader) {
      return res.status(400).json({
        error: "missing-auth-header",
        message: "auth header is missing",
      });
    }
    const token = tokenHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.json({
        error: "TokenExpiredError",
        message: error.message,
      });
    }
    return res.status(403).json({
      error: "invalid-token",
      message: error.message,
    });
  }
};

module.exports = auth;
