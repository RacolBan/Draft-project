const express = require('express');
const userRouter = require('./router/user_router.js');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const app = express();

// system apply json to all under level
app.use(bodyParser.json());
app.use(cookieParser());

require("dotenv").config();

app.use(express.static("public"))
app.use("/user", userRouter);

// get PORT from file .env, if novalue will get port = 3000
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}...`);
})
