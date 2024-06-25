const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require("../db");
const router = Router();

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.create({
    username,
    password,
  })
    .then(() => {
      res.json({
        msg: "Admin created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Can use zod for validation
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  Course.create({
    title,
    description,
    imageLink,
    price,
  })
    .then((course) => {
      res.status(200).json({
        msg: `Course created successfully with id ${course._id}`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json({
        msg: "Something went wrong",
      });
    });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

module.exports = router;
