import type { ChangeEvent } from "react";
import clsx from "clsx";

type InputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  error?: boolean;
};

const Input = ({
  value = "",
  placeholder = "Search...",
  onChange,
  error = false,
}: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={clsx(
        "w-full px-4 py-2 font-minecraft-3 bg-neutral-900 text-white placeholder-neutral-500 border focus:outline-none focus:ring-2 transition duration-200 shadow-inner",
        {
          "border-red-500 focus:ring-red-500 focus:border-red-500": error,
          "border-neutral-500 focus:ring-green-500 ": !error,
        }
      )}
    />
  );
};

export default Input;
