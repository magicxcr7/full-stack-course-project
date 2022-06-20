const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport); //it's a function
const cors = require("cors"); //

// connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // put here, before other route
app.use("/api/user", authRoute); // dont need passport
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
); // 外面/api/courses, 裡面/，跟外面/api, 裡面/courses 一樣

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
