import React from 'react';
import Link from 'next/link';

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-full transition";
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-primary-100 text-primary-700 hover:bg-primary-200",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-50"
  };
  
  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };
  
  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}