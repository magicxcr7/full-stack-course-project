const express = require("express");
// new version is: import express from "express";
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // default: read .env file
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
require("./config/passport"); // dont need var_name
const passport = require("passport");
// const cookieSession = require("cookie-session"); // dont need? change to express-session
const session = require("express-session");
const flash = require("connect-flash");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongoDB atlas.");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cookieSession({
//     keys: [process.env.SECRET],
//   })
// ); // put before other route then 1. init 2. session 3. deserialize (in passport.js)
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
); // replace cookieSession
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); // it can be use for other view
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
}); // localStrategy failure message will send to locals.error!
app.use("/auth", authRoute); // go to authRoute
app.use("/profile", profileRoute);

// order is important!!! 1. session 2. passport 3. flash 4. route

app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.user });
});

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
