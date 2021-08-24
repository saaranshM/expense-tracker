const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

// intializing the express app
const app = express();

//MIDDLEWARE//
app.use(cors());
app.use(express.json());

//ROUTES//
app.use("/user", require("./routes/user"));

app.listen(port, () => {
  console.log(`Server up on port ${port}!`);
});

module.exports = app;
