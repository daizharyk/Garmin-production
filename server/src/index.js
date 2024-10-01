const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const database = require("./database");
database();
const app = express();
const errorHandler = require("./infrastructure/errorHandler");
const PORT = 3005;
const api = require("./api/routes");

app.use(express.json());
const auth = (req, res, next) => {
  req.user = "Didar";
  next();
};

app.use(auth);

app.use("/api", api);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
