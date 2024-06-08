import React, { useEffect, useState } from "react";

interface Card {
  _id: string;
  title: string;
  description: string;
  selected: string;
}

const ViewCard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les cartes depuis l'API
    fetch("http://localhost:1234/api/card")
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des cartes :", error);
      });
  }, []);

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
