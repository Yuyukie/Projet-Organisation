const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cardRoutes = require("./routes/card");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://benjaminmazars:HwzHJvpszgP6g8Oa@todolist.sqrrtvv.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("api/card", cardRoutes);
app.use("api/user", userRoutes);

module.exports = app;
