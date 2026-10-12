import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'bestseller' | 'new' | 'limited' | 'pujo' | 'outline' | 'charm';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant, className = '' }) => {
  const getStyles = () => {
    switch (variant) {
      case 'bestseller':
        return 'bg-blush-200 text-charcoal-900 border-blush-300';
      case 'new':
        return 'bg-lavender-200 text-charcoal-900 border-lavender-300';
      case 'limited':
        return 'bg-pastelBlue-200 text-charcoal-900 border-pastelBlue-300';
      case 'pujo':
        return 'bg-rose-100 text-rose-800 border-rose-200 font-semibold';
      case 'charm':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'outline':
      default:
        return 'bg-white/90 text-charcoal-800 border-charcoal-200/50';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wider uppercase border shadow-2xs backdrop-blur-xs ${getStyles()} ${className}`}
    >
      {label}
    </span>
  );
};
