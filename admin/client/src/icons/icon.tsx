import type { CSSProperties } from "react";
import { paths } from "./paths";

export type IconProps = {
  size?: number;
  color?: string;
  className?: string; // To allow custom styles
  style?: CSSProperties; // To allow inline styles
};

type IconPath = keyof typeof paths;

export const Icon = ({ size = 24, className, style, name}: IconProps & { name: IconPath }) => {
  const path = paths[name]; // Use `name` to find the path, not `className`

  if (!path) {
    console.warn(`Path "${name}" does not exist.`);
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="transparent"
      className={`stroke-2 ${className}`} // Apply className for styling
      style={style}
    >
      <path d={path}  
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
