'use client';

import { Spinner as ChakraSpinner, SpinnerProps as ChakraSpinnerProps, Center, Text, VStack } from '@chakra-ui/react';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Extended spinner props
 */
export interface SpinnerProps extends ChakraSpinnerProps {
  /**
   * Text to display below the spinner
   */
  text?: string;
  
  /**
   * Whether to center the spinner
   * @default true
   */
  centered?: boolean;
  
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Height of the container
   * @default '100%'
   */
  containerHeight?: string | number;
}

/**
 * Custom spinner component with standardized styling
 */
export const Spinner = ({
  text,
  centered = true,
  size = 'md',
  containerHeight = '100%',
  color,
  ...props
}: SpinnerProps) => {
  const colors = useCommonColors();
  const spinnerColor = color || colors.primary;
  
  const spinnerElement = (
    <VStack spacing={4}>
      <ChakraSpinner
        color={spinnerColor}
        size={size}
        thickness="4px"
        speed="0.65s"
        {...props}
      />
      {text && (
        <Text color={colors.textSecondary} fontSize="sm">
          {text}
        </Text>
      )}
    </VStack>
  );
  
  if (centered) {
    return (
      <Center height={containerHeight} width="100%">
        {spinnerElement}
      </Center>
    );
  }
  
  return spinnerElement;
};

export default Spinner;
