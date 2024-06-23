const express = require("express");

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

const app = express();
app.use(express.json());

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

app.listen(3000);
