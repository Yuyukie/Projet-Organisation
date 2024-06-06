import AddCard from "./CardWithForm";
import { useState } from "react";
import ReactDOM from "react-dom";
import InfoCard from "./InfoCard"; // Importez le composant InfoCard
import { Button } from "./ui/button";

export function AddCardModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<{ name: string; description: string }[]>(
    []
  );

  const openTaskModal = () => {
    setModalOpen(true);
  };

  const closeTaskModal = () => {
    setModalOpen(false);
  };

  const addTask = async (task: { name: string; description: string }) => {
    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        setTasks([...tasks, task]);
        closeTaskModal();
      } else {
        console.error("Failed to save task:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="">
        <Button onClick={openTaskModal}>Add Task</Button>
      </div>

      {modalOpen &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 w-full h-full">
              <AddCard cancel={closeTaskModal} add={addTask} />
            </div>
          </>,
          document.body
        )}
      <div className="m-auto flex flex-wrap justify-center items-center gap-2">
        {tasks.map((task, index) => (
          <InfoCard key={index} title={task.name} task={task.description} />
        ))}
      </div>
    </div>
  );
}
