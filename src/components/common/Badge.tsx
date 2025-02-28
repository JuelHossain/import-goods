'use client';

import { Badge as ChakraBadge, BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

/**
 * Badge variant type
 */
export type BadgeVariant = 'solid' | 'subtle' | 'outline';

/**
 * Badge status type
 */
export type BadgeStatus = 'success' | 'info' | 'warning' | 'error' | 'default';

/**
 * Extended badge props
 */
export interface BadgeProps extends ChakraBadgeProps {
  /**
   * Status of the badge
   * @default 'default'
   */
  status?: BadgeStatus;
  
  /**
   * Variant of the badge
   * @default 'subtle'
   */
  variant?: BadgeVariant;
}

/**
 * Get color scheme based on status
 */
const getColorScheme = (status: BadgeStatus): string => {
  switch (status) {
    case 'success':
      return 'green';
    case 'info':
      return 'blue';
    case 'warning':
      return 'orange';
    case 'error':
      return 'red';
    case 'default':
    default:
      return 'gray';
  }
};

/**
 * Custom badge component with standardized styling
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    status = 'default',
    variant = 'subtle',
    children,
    ...props
  }, ref) => {
    const colorScheme = getColorScheme(status);
    
    return (
      <ChakraBadge
        ref={ref}
        variant={variant}
        colorScheme={colorScheme}
        px={2}
        py={1}
        borderRadius="full"
        textTransform="none"
        fontWeight="medium"
        {...props}
      >
        {children}
      </ChakraBadge>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
