const { Router } = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");
const router = Router();

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.create({
    username,
    password,
  });
  res.json({
    msg: "User created successfully",
  });
});

router.get("/courses", async (req, res) => {
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement purchase course logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: new mongoose.Types.ObjectId(courseId),
      },
    }
  );
  res.json({
    msg: "Purchased Complete",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = User.findOne({
    username: req.headers.username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res,
    json({
      courses: courses,
    });
});

module.exports = router;
