import React, { useState } from "react";
import Card from "./CreateCard"; // Import du composant Card
import Modal from "./Modal"; // Import du composant Modal
import ViewCard from "./ViewCard"; // Import du composant ViewCard

// Définition des types pour les props de View
interface ViewProps {
  onClose: () => void; // Fonction à appeler pour fermer la vue
  selected: Date | undefined; // Propriété pour stocker la date sélectionnée
}

// Définition du composant View
const View: React.FC<ViewProps> = ({ onClose, selected }) => {
  const [showViewCardModal, setShowViewCardModal] = useState(false); // State pour contrôler l'affichage de ViewCard
  const [showCardModal, setShowCardModal] = useState(false);
  const selectedDate = selected; // Stocke la date sélectionnée

  const handleCloseCardModal = () => {
    setShowCardModal(false);
  };

  const handleCreateCard = () => {
    setShowCardModal(true);
  };

  return (
    <div>
      <div className="flex justify-between">
        <button type="button" onClick={handleCreateCard}>
          Create Card
        </button>
        <button type="button" onClick={() => setShowViewCardModal(true)}>
          View Cards
        </button>
      </div>

      <Modal isOpen={showCardModal} onClose={handleCloseCardModal}>
        <Card
          onClose={handleCloseCardModal}
          selected={selectedDate}
          onCloseAll={onClose}
        />
      </Modal>

      {/* Condition pour afficher ViewCard */}
      {showViewCardModal && (
        <Modal isOpen={true} onClose={() => setShowViewCardModal(false)}>
          <ViewCard />
        </Modal>
      )}
    </div>
  );
};

export default View; // Export du composant View
