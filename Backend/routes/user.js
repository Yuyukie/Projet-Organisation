const express = require("express");
const router = express.Router(); // Crée un objet routeur Express

// Importe le contrôleur utilisateur depuis le fichier "../controllers/user"
const userCtrl = require("../controllers/user");

// Définit une route POST pour l'inscription d'un utilisateur
router.post("/signup", userCtrl.signup);

// Définit une route POST pour la connexion d'un utilisateur
router.post("/login", userCtrl.login);

// Exporte le routeur pour pouvoir l'utiliser dans d'autres fichiers
module.exports = router;
