const express = require("express");
const app = express();
const port = 3000;

const { Admin, Courses } = require("../db/index");

app.post("/admin/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
});

app.listen(port, () => {
  console.log(`Port running on port ${port}`);
});
