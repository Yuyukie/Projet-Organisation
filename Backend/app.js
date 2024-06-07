const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

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

app.use(cors());

app.use(bodyParser.json());

// Corrigez les chemins d'accès pour les routes
app.use("/api/card", cardRoutes);
app.use("/api/user", userRoutes); // Utilisez /api/user au lieu de api/user

module.exports = app;
