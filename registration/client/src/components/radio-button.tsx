import clsx from 'clsx';

type RadioButton = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  isSelected: boolean;
  error?: boolean;
};

const RadioButton = ({ label, value, onChange, isSelected, error }: RadioButton) => {
  const handleClick = () => {
    if (onChange) onChange(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'flex items-center space-x-3 cursor-pointer focus:outline-none w-full p-4',
        {
          'ring-2 ring-neutral-700 bg-neutral-800': !isSelected && !error,
          'ring-2 ring-green-500 bg-green-950': isSelected && !error,
          'ring-2 ring-rose-500 bg-red-950': error, // 🔴 error styling
        }
      )}
    >
      <span
        className={clsx({
          'w-6 h-6 border-2 transition-colors duration-200 flex items-center justify-center': true,
          'border-green-500 bg-green-500': isSelected && !error,
          'border-neutral-700 bg-neutral-900': !isSelected && !error,
          'border-rose-500 bg-rose-950': error,
        })}
      >
        {isSelected && !error && <div className="w-3 h-3 bg-neutral-900" />}
        {isSelected && error && <div className="w-3 h-3 bg-red-950" />}
      </span>
      <span className="text-neutral-200 font-minecraft-3">{label}</span>
    </button>
  );
};

export default RadioButton;
