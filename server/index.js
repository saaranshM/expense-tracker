const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

require("dotenv").config();
const client = require("./redis/redisInit");

const port = process.env.PORT || 5000;

// intializing the express app
const app = express();

//MIDDLEWARE//
app.use(cors());
app.use(express.json());
// middleware for req logging
app.use(morgan("combined"))

//ROUTES//
app.use("/user", require("./routes/user"));

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

function cleanup() {
  client.flushall();
  client.quit(function () {
    console.log("Redis client stopped.");
  });
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server up on port ${port}!`);
});

module.exports = app;
