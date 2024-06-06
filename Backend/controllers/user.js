const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("validator"); // Importez validator

exports.signup = (req, res, next) => {
  if (!req.body.email || !validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "L'e-mail fourni n'est pas valide." });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire identifiant/mot de passe incorrecte" });
          }
          // Générez un token JWT valide
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};
