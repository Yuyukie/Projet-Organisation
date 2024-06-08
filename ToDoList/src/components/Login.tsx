import { useState } from "react";

interface LoginProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let valid = true;
    setEmailError("");
    setPasswordError("");

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
        onClose();
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let valid = true;
    setEmailError("");
    setPasswordError("");

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
        onClose();
      } else {
        console.error("User creation failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
          <button type="button" onClick={onClose}>
            Close
          </button>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
