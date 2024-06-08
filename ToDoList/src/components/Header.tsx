import { useState } from "react";
import Modal from "./Modal"; // Import du composant Modal
import LoginForm from "./Login"; // Import du composant LoginForm

const App = () => {
  // State pour contrôler l'ouverture et la fermeture de la modal
  const [isModalOpen, setModalOpen] = useState(false);

  // Fonction pour ouvrir la modal
  const openModal = () => setModalOpen(true);

  // Fonction pour fermer la modal
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {/* Bouton pour ouvrir la modal */}
      <button onClick={openModal}>Login</button>

      {/* Modal pour afficher le formulaire de connexion */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Affichage du formulaire de connexion */}
        <LoginForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default App;
