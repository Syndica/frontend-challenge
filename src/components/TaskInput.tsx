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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 bg-white px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 transition focus:outline-none"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded focus:ring-2 focus:ring-indigo-400 font-bold text-sm text-white transition cursor-pointer focus:outline-none"
      >
        Add
      </button>
    </form>
  );
};

export default TaskInput;
