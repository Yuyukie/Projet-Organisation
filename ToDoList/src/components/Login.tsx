import { useState } from "react";

// Définition des types des props pour le composant LoginForm
interface LoginProps {
  onClose: () => void; // Fonction pour fermer la modal
}

// Définition du composant LoginForm avec les props typées
const LoginForm: React.FC<LoginProps> = ({ onClose }) => {
  // State pour gérer les champs du formulaire et les erreurs
  const [email, setEmail] = useState(""); // Champ email
  const [password, setPassword] = useState(""); // Champ mot de passe
  const [emailError, setEmailError] = useState(""); // Erreur email
  const [passwordError, setPasswordError] = useState(""); // Erreur mot de passe

  // Fonction pour valider un email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
    return emailRegex.test(email);
  };

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Validation de l'email
    if (!email) {
      setEmailError("Veuillez remplir le champ email.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Email invalide.");
      valid = false;
    }

    // Validation du mot de passe
    if (!password) {
      setPasswordError("Veuillez remplir le champ mot de passe.");
      valid = false;
    }

    if (!valid) return;

    // Envoi des données au serveur pour la connexion
    const data = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:1234/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        onClose(); // Ferme la modal après la connexion réussie
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Fonction pour gérer la création de compte
  const handleCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Validation de l'email
    if (!email) {
      setEmailError("Veuillez remplir le champ email.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Email invalide.");
      valid = false;
    }

    // Validation du mot de passe
    if (!password) {
      setPasswordError("Veuillez remplir le champ mot de passe.");
      valid = false;
    }

    if (!valid) return;

    // Envoi des données au serveur pour la création de compte
    try {
      const response = await fetch("http://localhost:1234/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User creation successful:", data);
        onClose(); // Ferme la modal après la création de compte réussie
      } else {
        console.error("User creation failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Rendu du formulaire de connexion
  return (
    <form className="bg-white p-4 rounded">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? "border-red-500" : ""}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="flex justify-between">
          {/* Bouton pour fermer la modal */}
          <button type="button" onClick={onClose}>
            Close
          </button>
          {/* Bouton pour se connecter */}
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          {/* Bouton pour créer un compte */}
          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
