import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  href = null,
  icon: Icon = null,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs sm:text-sm',
    md: 'px-5 py-2.5 text-sm sm:text-base',
    lg: 'px-7 py-3.5 text-base sm:text-lg',
  };

  const variantStyles = {
    primary: 'bg-yellow text-navy shadow-sm hover:bg-yellow-dark',
    secondary: 'border-2 border-navy text-navy hover:bg-navy hover:text-cream',
    ghost: 'text-navy hover:bg-cream-300/50',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedStyles} {...props}>
        {Icon && <Icon className={`mr-2 ${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 mr-2 border-2 border-navy border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon className={`mr-2 ${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      )}
      {children}
    </button>
  );
}
