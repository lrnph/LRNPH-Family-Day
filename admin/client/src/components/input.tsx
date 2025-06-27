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
        "w-full h-10 text-left placeholder:text-neutral-500 focus:outline-none bg-neutral-900 ring-2 ring-neutral-950 border border-neutral-700 rounded-lg text-white px-4 truncate overflow-hidden whitespace-nowrap flex items-center justify-between",
        {
          "border-red-500 focus:ring-red-500 focus:border-red-500": error,
          "border-neutral-500 focus:ring-lime-500 ": !error,
        }
      )}
    />
  );
};

export default Input;
