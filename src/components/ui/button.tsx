import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);
