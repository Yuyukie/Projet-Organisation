import React from "react";
import ReactDOM from "react-dom";

// Définition des types pour les props de Modal
interface ModalProps {
  isOpen: boolean; // Indique si la modal est ouverte ou non
  onClose: () => void; // Fonction à appeler pour fermer la modal
  children?: React.ReactNode; // Les éléments enfants de la modal
}

// Définition du composant Modal
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Si la modal n'est pas ouverte, ne rien afficher
  if (!isOpen) return null;

  // Utilisation de ReactDOM.createPortal pour afficher la modal dans un portail
  return ReactDOM.createPortal(
    // La modal est un div qui recouvre toute la fenêtre
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 w-full h-full">
      {/* Contenu de la modal */}
      <div className="bg-white p-4 rounded">
        {children} {/* Affiche les éléments enfants de la modal */}
        {/* Bouton de fermeture de la modal */}
        <button
          onClick={onClose} // Appelle la fonction onClose lorsque le bouton est cliqué
          className="absolute right-4 top-4 text-red-400"
        >
          X {/* Texte "X" pour fermer la modal */}
        </button>
      </div>
    </div>,
    document.body // Portail où la modal sera rendue (le body de la page)
  );
};

export default Modal; // Export du composant Modal
