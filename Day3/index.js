const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

// Passowrd Hidden
mongoose.connect(
  "mongodb+srv://<password>:hwuDsN0vHtRpG98S@cluster0.3eed2se.mongodb.net/newusers"
);

const User = mongoose.model("Users", {
  name: String,
  username: String,
  pasword: String,
});

const app = express();
app.use(express.json());

const user = new User({
  name: "aaryan shrivastava",
  username: "aaryan",
  pasword: "aaryan11",
});

user.save();
