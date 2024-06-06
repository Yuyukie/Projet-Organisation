// Importation des modules nécessaires
const http = require("http"); // Module HTTP intégré à Node.js pour créer des serveurs web
const app = require("./app"); // Importation de l'application Express configurée dans un autre fichier

// Fonction pour normaliser le port d'écoute
const normalizePort = (val) => {
  const port = parseInt(val, 10); // Convertir la valeur en un entier

  if (isNaN(port)) {
    // Vérifier si la conversion a échoué
    return val; // Retourner la valeur telle quelle si ce n'est pas un nombre
  }
  if (port >= 0) {
    // Vérifier si le port est un nombre valide (positif ou zéro)
    return port; // Retourner le port
  }
  return false; // Retourner false si la valeur est invalide
};

// Déterminer le port sur lequel l'application doit écouter
const port = normalizePort(process.env.PORT || "5173"); // Utiliser la variable d'environnement PORT ou 3000 par défaut
app.set("port", port); // Définir le port dans l'application Express

// Fonction de gestion des erreurs pour le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    // Vérifier si l'erreur est liée à l'écoute du serveur
    throw error; // Si non, relancer l'erreur
  }
  const address = server.address(); // Obtenir l'adresse du serveur
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port; // Déterminer le type de liaison (pipe ou port)

  switch (
    error.code // Gérer les différentes erreurs possibles
  ) {
    case "EACCES": // Erreur : permission refusée
      console.error(bind + " requires elevated privileges."); // Afficher un message d'erreur
      process.exit(1); // Quitter le processus avec un code d'erreur
      break;
    case "EADDRINUSE": // Erreur : adresse déjà utilisée
      console.error(bind + " is already in use."); // Afficher un message d'erreur
      process.exit(1); // Quitter le processus avec un code d'erreur
      break;
    default: // Autres erreurs
      throw error; // Relancer l'erreur
  }
};

// Créer un serveur HTTP avec l'application Express
const server = http.createServer(app);

// Écouter les événements d'erreur du serveur et appeler la fonction de gestion des erreurs
server.on("error", errorHandler);

// Écouter l'événement de démarrage du serveur
server.on("listening", () => {
  const address = server.address(); // Obtenir l'adresse du serveur
  const bind = typeof address === "string" ? "pipe " + address : "port " + port; // Déterminer le type de liaison (pipe ou port)
  console.log("Listening on " + bind); // Afficher un message indiquant que le serveur écoute
});

// Démarrer le serveur en écoutant sur le port spécifié
server.listen(port);
