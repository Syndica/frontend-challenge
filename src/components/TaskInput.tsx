import { useState } from "react";
import Spinner from "./Spinner";

interface TaskInputProps {
  onAdd: (text: string) => void;
  adding: boolean;
}

const TaskInput = ({ onAdd, adding }: TaskInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        placeholder="Add a task..."
        className="flex-1 px-3 py-2 border border-gray-500 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="btn-primary"
        disabled={adding}
      >
        {adding ? <Spinner /> : "Add"}
      </button>
    </form>
  );
};

export default TaskInput;
