import React, { useContext } from "react";
import { Context as MyContext } from "./Context";

import Calendar from "./Calendar";
import Display from "./Display";

const Body: React.FC = () => {
  const context = useContext(MyContext); // Utilisation du hook useContext pour accéder au contexte

  // Vérifie si le contexte existe
  if (!context) {
    throw new Error("Body must be used within a MyProvider"); // Lance une erreur si le contexte n'existe pas
  }

  const { data } = context; // Extraction des données du contexte

  return (
    <div>
      <Calendar /> {/* Affiche le composant Calendar */}
      <Display data={data} />
      {/* Affiche le composant Display avec les données du contexte */}
    </div>
  );
};

export default Body;
