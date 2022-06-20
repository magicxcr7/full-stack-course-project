const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.get("/signup", (req, res) => {
  // console.log("get signup: ", req.user);
  res.render("signup", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut(); // passport's method
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "Wrong email or password.",
  }),
  (req, res) => {
    if (res.session.returnTo) {
      let newPath = res.session.returnTo;
      req.session.returnTo = "";
      res.redirect(newPath); // newPath: /profile/path
    } else {
      res.redirect("/profile");
    }
  }
);

router.post("/signup", async (req, res) => {
  console.log(req.body);

  let { name, email, password } = req.body;
  // check if the data in DB
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    // return res.status(400).send("Email already exist.");
    req.flash("error_msg", "Email has already been registered.");
    res.redirect("/auth/signup");
  }

  const hash = await bcrypt.hash(password, 10);
  password = hash;

  let newUser = new User({ name, email, password });
  try {
    // const savedUser = await newUser.save();
    // res.status(200).send({
    //   msg: "User saved.",
    //   saveObj: savedUser,
    // });
    await newUser.save();
    req.flash("success_msg", "Registration succeeds. You can login now.");
    res.redirect("/auth/login");
  } catch (err) {
    // console.log(err.errors.name.properties);
    req.flash("error_msg", err.errors.name.properties.message);
    res.redirect("/auth/signup");
  }
});

// wrong method
// router.get("/google", (res, req)=>{
//     passport.authenticate("google", {
//         scope: ["profile"],
//     });
// });
// and if want select spicified account can use following:
// passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "select_account",
//   })
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.redirect("/profile"); // redirect to profile
  if (res.session.returnTo) {
    let newPath = res.session.returnTo;
    req.session.returnTo = "";
    res.redirect(newPath);
  } else {
    res.redirect("/profile");
  }
});

module.exports = router;
