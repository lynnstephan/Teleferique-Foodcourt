var express = require("express");
var router = express.Router();
var Users = require("../models/users");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post("/register", function (req, res, next) {
  var user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created_at: new Date(),
  });
  user
    .save()
    .then((data) => {
      res.send({
        success: true,
        data: data,
        message: "Users created",
      });
    })
    .catch((err) => {
      res
        .send({
          success: false,
          error: err,
          message: "User already exists",
        })
        .status(409);
    });
});

router.post("/login", function (req, res, next) {
  Users.findOne({
    email: req.body.email,
  }).then(function (user, err) {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    } else if (user) {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, compResult) {
          if (!compResult) {
            res.json({
              success: false,
              message: "Wrong Password",
            });
          } else {
            var payload = {
              id: user._id,
            };
            var token = jwt.sign(payload, process.env.JWT_SECRET);

            Users.findById(user._id).exec((err, result) => {
              res.send({
                success: true,
                id: result._id,
                user: result,
                token: token,
                name: result.name,
              });
            });
          }
        }
      );
    }
  });
});

module.exports = router;
