'use client';

import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Extended button props
 */
export interface ButtonProps extends ChakraButtonProps {
  /**
   * Variant of the button
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  
  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Whether the button is primary
   * @default false
   */
  isPrimary?: boolean;
  
  /**
   * Whether the button is full width
   * @default false
   */
  isFullWidth?: boolean;
}

/**
 * Custom button component with standardized styling
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'solid', 
    size = 'md', 
    isPrimary = false,
    isFullWidth = false,
    ...props 
  }, ref) => {
    const colors = useCommonColors();
    
    // Set color scheme based on isPrimary
    const colorScheme = isPrimary ? 'brand' : undefined;
    
    // Set background color for solid variant
    const bg = isPrimary && variant === 'solid' ? 'brand.500' : undefined;
    
    // Set hover background color for solid variant
    const hoverBg = isPrimary && variant === 'solid' ? 'brand.600' : undefined;
    
    return (
      <ChakraButton
        ref={ref}
        variant={variant}
        size={size}
        colorScheme={colorScheme}
        bg={bg}
        width={isFullWidth ? 'full' : undefined}
        _hover={{
          bg: hoverBg,
        }}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
