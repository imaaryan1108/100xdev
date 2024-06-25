const { User } = require("../db");

const userMiddleware = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  User.findOne({
    username: username,
    password: password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(403).json({
        msg: "User does not exist",
      });
    }
  });
};

module.exports = userMiddleware;
