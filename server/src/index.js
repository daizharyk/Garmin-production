require("dotenv").config();
const express = require("express");
const database = require("./database");
database();
const app = express();
const errorHandler = require("./infrastructure/errorHandler");
const PORT = 3005;
const api = require("./api/routes");
const { auth } = require("./middlewares/auth");
const cors = require("cors");


app.use(cors({
  origin: 'http://localhost:3001', // Укажите, с какого источника разрешены запросы
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Укажите разрешенные методы
  credentials: true, // Разрешить отправку куки
}));


app.use(express.json());

app.use(auth);

app.use("/api", api);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
