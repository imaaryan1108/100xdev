const express = require("express");
const zod = require("zod");
const app = express();
app.use(express.json());

// ZOD Validation
const schema = zod.array(zod.number());

const schemaTwo = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  country: zod.literal("IN").or(zod.literal("US")),
  kindeys: zod.array(zod.number()),
});

const users = [
  {
    name: "Aaryan",
    kindeys: [
      {
        healthy: true,
      },
      {
        healthy: false,
      },
    ],
  },
];

const middlewareOne = (req, res, next) => {
  // Condition Checks
  console.log("Inside Middleware One");
  next();
};

const middlewareTwo = (req, res, next) => {
  // Condition Checks
  console.log("Inside Middleware Two");
  next();
};

app.get("/", (req, res) => {
  const noOfKidneys = users[0]?.kindeys?.length;

  const noOfHealthyKidneys = users[0]?.kindeys?.filter(
    (user) => user?.healthy === true
  )?.length;

  const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys;

  console.log(noOfKidneys);
  res.json({ noOfKidneys, noOfHealthyKidneys, noOfUnhealthyKidneys });
  return;
});

app.post("/", (req, res) => {
  const isHealthy = req?.body?.isHealthy;
  users[0]?.kindeys?.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Kindney Added",
  });
});

app.put("/", (req, res) => {
  users[0]?.kindeys?.map((user) => (user.healthy = true));
  res.json({
    msg: "Kidney Healthfied",
  });
});

app.delete("/", (req, res) => {
  let _atleastOneBadKidney = false;

  users[0]?.kindeys?.map((user) => {
    if (!user.healthy) {
      _atleastOneBadKidney = true;
    }
  });

  if (_atleastOneBadKidney) {
    const _newKindeys =
      users[0]?.kindeys?.filter((user) => user.healthy === true) || [];
    users[0].kindeys = _newKindeys;
    res.json({
      msg: "Removed all unhealthy kindeys",
    });
  } else {
    res.status(411).send("ERROR");
  }
});

// Middlewares
app.post("/health-checkup", middlewareOne, middlewareTwo, (req, res) => {
  const kidneys = req.body.kindeys;
  const response = schema.safeParse(kidneys);

  if (!response.success) {
    res.status(411).json({
      msg: "Invalid Input",
    });
  }
  // const kindyeLength = kindeys.length;

  res.json({
    response,
  });
});

// Global Catch
app.use((err, req, res, next) => {
  res.send("Something went wrong");
});
app.listen(3000);
