'use client';

import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

// Props for when the button is rendered as an HTML button
interface ButtonProps extends CommonButtonProps, Omit<ComponentPropsWithoutRef<'button'>, keyof CommonButtonProps> {
  href?: undefined;
}

// Props for when the button is rendered as a Link
interface LinkProps extends CommonButtonProps, Omit<ComponentPropsWithoutRef<'a'>, keyof CommonButtonProps> {
  href: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
};

const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...rest
  } = props;

  const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...linkProps } = rest as LinkProps;
    return (
      <Link 
        href={href} 
        className={combinedClassName}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = rest as ButtonProps;
  return (
    <button 
      type={type}
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}