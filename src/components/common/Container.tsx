'use client';

import { Container as ChakraContainer, ContainerProps as ChakraContainerProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Extended container props
 */
export interface ContainerProps extends ChakraContainerProps {
  /**
   * Whether to add a background color to the container
   * @default false
   */
  withBackground?: boolean;
  
  /**
   * Whether to add padding to the container
   * @default true
   */
  withPadding?: boolean;
  
  /**
   * Whether to center the container
   * @default true
   */
  isCentered?: boolean;
}

/**
 * Custom container component with standardized styling
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({
    withBackground = false,
    withPadding = true,
    isCentered = true,
    children,
    ...props
  }, ref) => {
    const colors = useCommonColors();
    
    return (
      <ChakraContainer
        ref={ref}
        maxW="container.xl"
        centerContent={isCentered}
        bg={withBackground ? colors.containerBg : undefined}
        p={withPadding ? { base: 4, md: 6 } : 0}
        {...props}
      >
        {children}
      </ChakraContainer>
    );
  }
);

Container.displayName = 'Container';

export default Container;
