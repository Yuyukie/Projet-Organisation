import React from "react";

// Définition du type pour chaque élément de données
interface DataItem {
  id: number;
  title: string;
  description: string;
  selected: string;
}

// Définition des types des props pour Display
interface DisplayProps {
  data: DataItem[]; // Les données à afficher
}

// Définition du composant Display avec les props typées
const Display: React.FC<DisplayProps> = ({ data }) => {
  return (
    <div>
      <h2>Data from ViewCard:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.title}:</strong> {item.description} {item.selected}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
