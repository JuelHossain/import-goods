'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Extended card props
 */
export interface CardProps extends BoxProps {
  /**
   * Whether to add a shadow to the card
   * @default true
   */
  withShadow?: boolean;
  
  /**
   * Whether to add a border to the card
   * @default false
   */
  withBorder?: boolean;
  
  /**
   * Whether to add hover effect to the card
   * @default false
   */
  withHoverEffect?: boolean;
}

/**
 * Custom card component with standardized styling
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    withShadow = true, 
    withBorder = false,
    withHoverEffect = false,
    children,
    ...props 
  }, ref) => {
    const colors = useCommonColors();
    
    return (
      <Box
        ref={ref}
        bg={colors.cardBg}
        borderRadius="md"
        p={4}
        boxShadow={withShadow ? colors.shadow : 'none'}
        borderWidth={withBorder ? '1px' : 0}
        borderColor={withBorder ? colors.borderPrimary : undefined}
        transition="all 0.2s"
        _hover={withHoverEffect ? {
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
        } : undefined}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Card.displayName = 'Card';

export default Card;
