import React, { useEffect, useState, useContext } from "react";
import { Context as MyContext } from "./Context";

// Définition du type pour une carte
interface Card {
  _id: string;
  title: string;
  description: string;
  selected: string;
}

// Définition du composant ViewCard
const ViewCard: React.FC = () => {
  // State pour stocker les cartes récupérées
  const [cards, setCards] = useState<Card[]>([]);

  // Utilisation du contexte
  const context = useContext(MyContext);

  // Vérifie si le composant est utilisé à l'intérieur de MyProvider
  if (!context) {
    throw new Error("ViewCard must be used within a MyProvider");
  }

  // Extraction de la fonction pour mettre à jour les données du contexte
  const { setData } = context;

  // Effet pour charger les cartes depuis l'API et mettre à jour le contexte
  useEffect(() => {
    fetch("http://localhost:1234/api/card")
      .then((response) => response.json())
      .then((data) => {
        setCards(data); // Met à jour les cartes avec les données récupérées
        setData(data); // Met à jour le contexte avec les données récupérées
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des cartes :", error);
      });
  }, [setData]); // Déclenche l'effet uniquement lorsque setData change

  // Rendu des cartes
  return (
    <div>
      <h2>Cartes présentes dans la base de données :</h2>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <p>Date sélectionnée: {card.selected}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCard;
