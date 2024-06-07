import { useState } from "react";
import Modal from "./Modal";
import LoginForm from "./Login";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Login</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LoginForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default App;
