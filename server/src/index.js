require("dotenv").config();
const express = require("express");
const database = require("./database");
database();
const app = express();
const errorHandler = require("./infrastructure/errorHandler");
const PORT = process.env.PORT || 3005;
const api = require("./api/routes");
const { auth } = require("./middlewares/auth");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(auth);

app.use("/api", api);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

app.get("/pages/*", (req, res) => {
  // Формируем путь к файлу, добавляя .html в конце
  res.sendFile(path.join(__dirname, "dist", req.path + ".html"));
});
