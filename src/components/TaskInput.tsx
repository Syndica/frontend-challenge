import { useState, useRef, useEffect, useCallback } from 'react';

interface TaskInputProps {
  onAdd: (text: string) => void;
}

const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed);
      setText('');
    }
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 mb-4'>
      <input
        ref={inputRef}
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Add a task...'
        className='flex-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />
      <button
        type='submit'
        className='cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition'
      >
        Add
      </button>
    </form>
  );
};

export default TaskInput;
