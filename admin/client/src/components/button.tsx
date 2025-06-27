import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary'; // you can add more variants later
};

const Button = ({
  onClick,
  children,
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  const baseStyles =
    'transition-colors ease-in-out duration-300 rounded-lg px-4 h-10 text-white font-medium relative flex items-center justify-center text-sm cursor-pointer w-fit';

  const variantStyles = {
    primary:'bg-lime-500 hover:bg-lime-400 active:bg-lime-600 shadow-2xl shadow-lime-500',
    secondary:'bg-neutral-700 hover:bg-neutral-400 active:bg-lime-600 shadow-2xl ',
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
