import React, { createContext, useState, ReactNode } from "react";

// Définition du type pour chaque élément de données
interface DataItem {
  id: number;
  title: string;
  description: string;
  selected: string;
}

// Définition des types pour les propriétés du contexte
interface ContextProps {
  data: DataItem[]; // Tableau des éléments de données
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>; // Fonction pour mettre à jour les données
}

// Création du contexte avec le type ContextProps ou undefined par défaut
const Context = createContext<ContextProps | undefined>(undefined);

// Création du fournisseur de contexte
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State pour stocker les données
  const [data, setData] = useState<DataItem[]>([]);

  // Rendu du fournisseur avec le contexte et les enfants
  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  );
};

export { Context, MyProvider };
