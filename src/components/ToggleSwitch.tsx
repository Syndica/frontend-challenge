interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label="Toggle switch"
      onClick={onChange}
      className={`mr-6 relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 ${
        checked ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
