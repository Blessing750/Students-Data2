const express = require("express");
const app = express()
const dotenv = require("dotenv").config()
const connectDb=require("./config/dbconnection")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

const port=process.env.port || 3000

connectDb()
app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:600 },
  })
)
app.use(flash())

app.use("/",require("./routes/staticRouter"))
app.use("/user", require("./routes/user"))

app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`);
});