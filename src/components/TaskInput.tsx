import { useState } from "react";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

const TaskInput = ({ onAdd }: TaskInputProps) => {
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
    <form onSubmit={handleSubmit} aria-label="Add new task" className="nixie-one-regular flex items-center gap-2 mb-4">
      <input
        type="text"
        aria-label="Task name"
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
        aria-label="Add task"
        type="submit"
        className="nixie-one-regular px-4 py-2 bg-[#3cb371] text-white rounded hover:bg-bg-[#009AFF] transition cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export default TaskInput;
