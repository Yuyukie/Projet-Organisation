import React, { useState, useContext } from "react";
import { Context as MyContext } from "./Context"; // Import du contexte

// Définition des types pour les props de Card
interface CardProps {
  onClose: () => void; // Fonction à appeler pour fermer la modal de la carte
  selected: Date | undefined; // Propriété pour stocker la date sélectionnée
  onCloseAll: () => void; // Fonction pour fermer toutes les modales
}

// Définition du composant Card
const Card: React.FC<CardProps> = ({ selected, onCloseAll }) => {
  // State pour stocker le titre et la description de la carte
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Utilisation du contexte
  const context = useContext(MyContext);

  // Extraction de la fonction pour mettre à jour le contexte
  const { setData } = context!; // Utilisation du ! pour indiquer que le contexte existe toujours

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    const cardData = {
      title,
      description,
      selected: selected ? selected.toISOString() : "", // Convertit la date sélectionnée en chaîne ISO
    };
    await addCard(cardData); // Appelle la fonction pour ajouter la carte
  };

  // Fonction pour ajouter la carte
  const addCard = async (cardData: {
    title: string;
    description: string;
    selected: string;
  }) => {
    try {
      // Effectue une requête pour ajouter la carte
      const response = await fetch("http://localhost:1234/api/card/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData), // Envoie les données de la carte au format JSON
      });

      if (response.ok) {
        console.log("Card created successfully!"); // Affiche un message si la carte est créée avec succès
        setTitle(""); // Réinitialise le titre
        setDescription(""); // Réinitialise la description
        onCloseAll(); // Ferme toutes les modales après la création de la carte

        // Mettre à jour le contexte avec les nouvelles données
        const newData = await response.json(); // Récupère les données de la nouvelle carte
        setData((prevData) => [...prevData, newData]); // Ajoute la nouvelle carte aux données existantes
      } else {
        console.error("Failed to save card:", response.statusText); // Affiche une erreur si la création de la carte échoue
      }
    } catch (error) {
      console.error("An error occurred:", error); // Affiche une erreur en cas d'erreur lors de la requête
    }
  };

  // Rendu du composant Card
  return (
    <div>
      {/* Formulaire pour créer une carte */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded">
        <div className="grid w-full items-center gap-4">
          {/* Champ de saisie pour le titre */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Met à jour le titre lorsqu'il change
            />
          </div>
          {/* Champ de saisie pour la description */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Met à jour la description lorsqu'elle change
            />
          </div>
          {/* Bouton de soumission du formulaire */}
          <div className="flex justify-between">
            <button type="submit">Create</button> {/* Soumet le formulaire */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Card; // Export du composant Card
