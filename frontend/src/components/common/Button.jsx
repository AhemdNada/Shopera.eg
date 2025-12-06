import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group';
  
  const variantStyles = {
    primary: 'bg-white text-gray-800 hover:bg-[#ff5252] hover:text-white border border-black',
    navigation: 'bg-white text-gray-800 hover:bg-[#ff5252] hover:text-white rounded-full shadow-md',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-[#ff5252] text-white hover:bg-[#e53935]',
    viewAll: 'bg-white text-gray-800 hover:bg-[#ff5252] hover:text-white border border-gray-300 hover:border-[#ff5252] rounded-md shadow-sm hover:shadow-md',
    outline: 'bg-white text-gray-800 hover:bg-[#ff5252] hover:text-white border border-black rounded-full',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'w-10 h-10', // For navigation buttons
  };
  
  const getVariantClass = () => {
    if (variant === 'navigation') {
      return variantStyles.navigation;
    }
    return variantStyles[variant] || variantStyles.primary;
  };
  
  const getSizeClass = () => {
    if (variant === 'navigation') {
      return sizeStyles.icon;
    }
    return sizeStyles[size] || sizeStyles.md;
  };
  
  const classes = `${baseStyles} ${getVariantClass()} ${getSizeClass()} ${className}`;
  
  // Navigation button variant (for prev/next)
  if (variant === 'navigation') {
    const iconToShow = icon === 'prev' ? faChevronLeft : icon === 'next' ? faChevronRight : icon;
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {iconToShow && (
          <FontAwesomeIcon 
            icon={iconToShow} 
            className="w-3 h-3" 
          />
        )}
        {children}
      </button>
    );
  }
  
  // Regular button
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`ml-2 transition-transform duration-300 ${variant === 'viewAll' ? 'group-hover:translate-x-1' : ''}`}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;