var jwt = require("jsonwebtoken");

var auth = function () {
  return async (req, res, next) => {
    var token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (token != null) {
      req.token = token;
      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          err.message = "unverified token";
          return res.send({ success: false, message: "Unverified Token" });
        }
        req.decoded = decoded;
        console.log(decoded);
        next();
      });
    } else {
      res.send("Unauthorized").status(401);
    }
  };
};

module.exports = auth;
