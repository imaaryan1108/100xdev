const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "aaryab@gmail.com",
    password: "123456",
    name: "Aaryan Shrivastava",
  },
  {
    username: "john.doe@example.com",
    password: "password123",
    name: "John Doe",
  },
  {
    username: "emma.watson@example.com",
    password: "emma!@#321",
    name: "Emma Watson",
  },
];

const userExists = (username, password) => {
  const _userExists = ALL_USERS.find((user) => user.username === username);
  console.log("Does exist");

  if (!!_userExists) return true;
  console.log("Does not exist");
  return false;
};

app.post("/signin", (req, res) => {
  console.log("HERE");
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User does not exist",
    });
  }

  var token = jwt.sign({ username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  console.log({ token });
  try {
    const decoded = jwt.verify(token, jwtPassword, { expiresIn: "1h" });
    const username = decoded.username;
    const otherUsers = ALL_USERS.filter((user) => user.username !== username);
    res.json({
      users: otherUsers,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid Token",
    });
  }
});

app.listen(3000);
