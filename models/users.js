var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

var userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    next();
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
