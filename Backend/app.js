const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Card = require("./models/Card");
const User = require("./models/User");

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

app.post("api/Card", (req, res, next) => {
  delete req.body._id;
  const card = new Card({
    ...req.body,
  });
  card
    .save()
    .then(() => res.status(201).json({ message: "Card enregistré" }))
    .catch((error) => res.status(400).json({ message: "error" }));
});

app.post("api/User", (req, res, next) => {
  delete req.body._id;
  const user = new User({
    ...req.body,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "user enregistré" }))
    .catch((error) => res.status(400).json({ message: "error" }));
});

module.exports = app;
