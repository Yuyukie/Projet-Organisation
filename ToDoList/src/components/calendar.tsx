import { useState } from "react";
import { DayPicker } from "react-day-picker";
import Modal from "./Modal";
import View from "./View";
import "react-day-picker/dist/style.css";

// Définition du composant MyDatePicker
const MyDatePicker = () => {
  // State pour stocker la date sélectionnée et l'état de la modal
  const [selected, setSelected] = useState<Date | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Gérer le clic sur une journée dans DayPicker
  const handleDayClick = (day: Date) => {
    setSelected(day); // Met à jour la date sélectionnée
    setModalOpen(true); // Ouvre la modal lorsque la journée est cliquée
  };

  // Fonction pour fermer la modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Fonction pour fermer toutes les modales
  const handleCloseAllModals = () => {
    setModalOpen(false);
    // Vous pouvez ajouter ici d'autres fonctions pour fermer d'autres modales si nécessaire
  };

  // Rendu du composant MyDatePicker
  return (
    <div className="flex flex-col justify-center items-center">
      {/* DayPicker permet de sélectionner une date */}
      <DayPicker
        mode="single" // Mode de sélection unique
        selected={selected} // Date sélectionnée
        onSelect={setSelected} // Fonction pour mettre à jour la date sélectionnée
        onDayClick={handleDayClick} // Gère le clic sur une journée
      />
      {/* Modal pour afficher les détails de la date sélectionnée */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {/* Passer la date formatée à View */}
        <View onClose={handleCloseAllModals} selected={selected} />
      </Modal>
    </div>
  );
};

export default MyDatePicker; // Export du composant MyDatePicker
