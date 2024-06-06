import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Définition du type d'action
type Action = "login" | "create";

const LoginModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const openLoginModal = () => {
    setModalOpen(true);
  };

  const closeLoginModal = () => {
    setModalOpen(false);
  };

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (action: Action) => {
    // Réinitialisation des erreurs
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email) {
      setEmailError("Veuillez remplir le champ email.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Email invalide.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Veuillez remplir le champ mot de passe.");
      valid = false;
    }

    if (!valid) return;

    try {
      // URL en fonction de l'action
      const url = action === "login" ? "/api/user" : "/api/user";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (action === "login") {
          console.log("Login successful:", data);
        } else {
          console.log("User creation successful:", data);
        }
        closeLoginModal();
      } else {
        const errorMessage =
          action === "login" ? "Login failed" : "User creation failed";
        console.error(errorMessage, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLogin = async () => {
    await handleSubmit("login");
  };

  const handleCreate = async () => {
    await handleSubmit("create");
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <Button onClick={openLoginModal}>Login</Button>
        </div>
      </div>
      {modalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 w-full h-full">
            <form className="bg-white p-4 rounded">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? "border-red-500" : ""}
                  />
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button type="button" onClick={closeLoginModal}>
                    Close
                  </Button>
                  <Button type="button" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button type="button" onClick={handleCreate}>
                    Create
                  </Button>
                </div>
              </div>
            </form>
          </div>,
          document.body
        )}
    </div>
  );
};

export default LoginModal;
