// components/Badge.tsx
import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'urgent' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  size = 'md', 
  children 
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    urgent: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={clsx(baseStyles, variantStyles[variant], sizeStyles[size])}>
      {children}
    </span>
  );
};

export default Badge;