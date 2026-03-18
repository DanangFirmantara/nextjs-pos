import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = "font-medium rounded transition-colors";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    ghost: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "text-red-600 hover:bg-red-50",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  color?: "primary" | "gray" | "red" | "blue";
}

export function Badge({ children, color = "primary" }: BadgeProps) {
  const colorMap = {
    primary: "bg-blue-500 text-white",
    gray: "bg-gray-200 text-gray-700",
    red: "bg-red-100 text-red-500",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded font-medium ${colorMap[color]}`}>
      {children}
    </span>
  );
}
