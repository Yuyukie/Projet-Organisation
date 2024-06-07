import { useState } from "react";
import ReactDOM from "react-dom";
import InfoCard from "./InfoCard"; // Importez le composant InfoCard
import { Button } from "./ui/button";

const CardModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<
    { title: string; description: string; created_at: string }[]
  >([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const openTaskModal = () => {
    setModalOpen(true);
    setConfirmationMessage("");
  };

  const closeTaskModal = () => {
    setModalOpen(false);
    setConfirmationMessage("");
  };

  const addTask = async (task: { title: string; description: string }) => {
    try {
      const response = await fetch("http://localhost:1234/api/card/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task), // Convertit l'objet en chaîne JSON
      });

      if (response.ok) {
        // Ajoutez created_at après l'ajout réussi
        const createdAt = new Date().toISOString().split("T")[0];
        const taskWithDate = { ...task, created_at: createdAt };
        setTasks((prevTasks) => [...prevTasks, taskWithDate]);
        setConfirmationMessage("La carte a été enregistrée avec succès !");
        setName(""); // Clear name field
        setDescription(""); // Clear description field
        setModalOpen(false); // Ferme la modal après l'ajout
      } else {
        console.error("Failed to save task:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = { title: name, description }; // Utiliser title au lieu de name
    await addTask(task);
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <Button onClick={openTaskModal}>Add Task</Button>
      </div>

      {modalOpen &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 w-full h-full">
              <div className="bg-white p-4 rounded">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <input
                      id="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={closeTaskModal}>
                      Cancel
                    </button>
                    <button type="submit">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </>,
          document.body
        )}
      {confirmationMessage && (
        <div className="m-auto flex flex-wrap justify-center items-center gap-2">
          <p className="text-green-500">{confirmationMessage}</p>
        </div>
      )}
      <div className="m-auto flex flex-wrap justify-center items-center gap-2">
        {tasks.map((task, index) => (
          <InfoCard
            key={`${task.title}-${index}`} // Utiliser task.title au lieu de task.name
            title={task.title}
            task={task.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CardModal;
