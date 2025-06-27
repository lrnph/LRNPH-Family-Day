import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  isLoading?: boolean;
  variant?: 'neutral' | 'success' | 'danger';
};

const Button = ({
  onClick,
  children,
  className,
  isLoading = false,
  disabled,
  variant = 'success',
  ...rest
}: ButtonProps) => {
  const baseStyles = 'px-4 h-12 font-minecraft-4 relative flex items-center justify-center text-xl cursor-pointer w-full';
  const isDisabled = isLoading || disabled;

  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        baseStyles,
        {
          // Background color
          'bg-gray-400 text-black': variant === 'neutral',
          'bg-green-600 text-white': variant === 'success',
          'bg-red-600 text-white': variant === 'danger',

          // Disabled styles
          'opacity-50 cursor-not-allowed': isDisabled,
        },
        className
      )}
      disabled={isDisabled}
      {...rest}
    >
      <span
        className={clsx(
          'w-full h-full absolute border-x-4 ring-4 ring-black',
          {
            'border-gray-500': variant === 'neutral',
            'border-green-700': variant === 'success',
            'border-red-700': variant === 'danger',
          }
        )}
      />
      <span
        className={clsx(
          'w-full h-full absolute border-b-4',
          {
            'border-gray-600': variant === 'neutral',
            'border-green-900': variant === 'success',
            'border-red-900': variant === 'danger',
          }
        )}
      />
      <span
        className={clsx(
          'w-full h-full absolute border-t-4',
          {
            'border-gray-300': variant === 'neutral',
            'border-green-400': variant === 'success',
            'border-red-400': variant === 'danger',
          }
        )}
      />
      <label className="pointer-events-none mb-2">
        {isLoading ? 'Loading...' : children}
      </label>
    </button>
  );
};

export default Button;
