import React, { useState } from "react";
import Card from "./CreateCard";
import Modal from "./Modal";
import ViewCard from "./ViewCard";

// Définition des types des props pour le composant View
interface ViewProps {
  onClose: () => void; // Fonction pour fermer la vue
  selected: Date | undefined; // Propriété pour stocker la date sélectionnée
}

// Définition du composant View avec les props typées
const View: React.FC<ViewProps> = ({ onClose, selected }) => {
  // State pour contrôler l'affichage des modals
  const [showViewCardModal, setShowViewCardModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  // Fonction pour fermer la modal de création de carte
  const handleCloseCardModal = () => {
    setShowCardModal(false);
  };

  // Fonction pour ouvrir la modal de création de carte
  const handleCreateCard = () => {
    setShowCardModal(true);
  };

  return (
    <div>
      {/* Boutons pour créer une carte et afficher les cartes */}
      <div className="flex justify-between">
        <button type="button" onClick={handleCreateCard}>
          Create Card
        </button>
        <button type="button" onClick={() => setShowViewCardModal(true)}>
          View Cards
        </button>
      </div>

      {/* Modal pour la création de carte */}
      <Modal isOpen={showCardModal} onClose={handleCloseCardModal}>
        <Card
          onClose={handleCloseCardModal}
          selected={selected}
          onCloseAll={onClose}
        />
      </Modal>

      {/* Condition pour afficher la modal de visualisation de cartes */}
      {showViewCardModal && (
        <Modal isOpen={true} onClose={() => setShowViewCardModal(false)}>
          <ViewCard />
        </Modal>
      )}
    </div>
  );
};

export default View;
