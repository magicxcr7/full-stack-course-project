const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 100,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },

  data: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isStudent = function () {
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

userSchema.methods.inAdmin = function () {
  return this.role == "admin";
};

//
// mongoose schema middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password ") || this.isNew()) {
    const hash = await bcrypt.hash(this.password, 10); // 10 meaning?
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
