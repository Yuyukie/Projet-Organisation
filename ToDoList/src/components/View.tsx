import React, { useState } from "react";
import Card from "./Card"; // Import du composant Card
import Modal from "./Modal"; // Import du composant Modal

// Définition des types pour les props de View
interface ViewProps {
  onClose: () => void; // Fonction à appeler pour fermer la vue
  selected: Date | undefined; // Propriété pour stocker la date sélectionnée
}

// Définition du composant View
const View: React.FC<ViewProps> = ({ onClose, selected }) => {
  // State pour gérer l'ouverture de la modal de la carte
  const [showCardModal, setShowCardModal] = useState(false);
  const selectedDate = selected; // Stocke la date sélectionnée

  // Fonction pour fermer la modal de la carte
  const handleCloseCardModal = () => {
    setShowCardModal(false);
  };

  // Fonction pour ouvrir la modal de la carte
  const handleCreateCard = () => {
    setShowCardModal(true);
  };

  // Rendu du composant View
  return (
    <div>
      <div className="flex justify-between">
        {/* Bouton pour créer une carte */}
        <button type="button" onClick={handleCreateCard}>
          Create Card
        </button>
      </div>

      {/* Modal pour la carte */}
      <Modal isOpen={showCardModal} onClose={handleCloseCardModal}>
        {/* Card component inside the modal */}
        <Card
          onClose={handleCloseCardModal} // Fonction pour fermer la modal de la carte
          selected={selectedDate} // Date sélectionnée
          onCloseAll={onClose} // Fonction pour fermer toutes les modales
        />
      </Modal>
    </div>
  );
};

export default View; // Export du composant View
