const express = require("express")
const cors = require("cors")

const port = process.env.PORT || 3000;

// intializing the express app
const app = express();

// middleware
app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server up on port ${port}!`);
})


