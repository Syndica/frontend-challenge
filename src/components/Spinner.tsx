interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = "h-4 w-4 text-white" }: SpinnerProps) => {
  return (
    <span
      className={`animate-spin inline-block rounded-full border-2 border-t-transparent border-current ${className}`}
      role="status"
      aria-label="loading spinner"
    />
  );
};

export default Spinner;
