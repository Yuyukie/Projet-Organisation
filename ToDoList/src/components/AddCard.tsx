import { useState } from "react";

interface AddCardProps {
  cancel: () => void;
  add: (task: { name: string; description: string }) => Promise<void>;
}

const AddCard: React.FC<AddCardProps> = ({ cancel, add }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await add({ name, description });
    setName(""); // Clear name field
    setDescription(""); // Clear description field
  };

  return (
    <div className="bg-white p-4 rounded">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <button type="button" onClick={cancel}>
            Cancel
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
