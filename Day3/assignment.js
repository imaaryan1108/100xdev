const jwt = require("jsonwebtoken");

const value = {
  name: "Aaryan",
  number: "5732895723895720",
};

const token = jwt.sign(value, "secret");

// const token = jwt.verify(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWFyeWFuIiwibnVtYmVyIjoiNTczMjg5NTcyMzg5NTcyMCIsImlhdCI6MTcxOTI1NTY2OX0.KqBUkqpP9e07cuolrX_AlW7KE0fGDUovvILCblzjD6I",
//   "secret"
// );

console.log(token);
