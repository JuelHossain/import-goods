'use client';

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Extended input props
 */
export interface InputProps extends ChakraInputProps {
  /**
   * Label for the input
   */
  label?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Whether the input is required
   * @default false
   */
  isRequired?: boolean;
  
  /**
   * Whether the form control should take the full width
   * @default true
   */
  isFullWidth?: boolean;
}

/**
 * Custom input component with standardized styling and form control
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    isRequired = false,
    isFullWidth = true,
    isInvalid,
    ...props
  }, ref) => {
    const colors = useCommonColors();
    
    // Determine if the input is invalid based on the error prop or isInvalid prop
    const hasError = !!error || isInvalid;
    
    return (
      <FormControl 
        isInvalid={hasError} 
        isRequired={isRequired}
        width={isFullWidth ? 'full' : 'auto'}
        mb={3}
      >
        {label && <FormLabel>{label}</FormLabel>}
        
        <ChakraInput
          ref={ref}
          bg={colors.inputBg}
          borderColor={colors.inputBorder}
          _hover={{
            borderColor: hasError ? 'red.300' : 'brand.300',
          }}
          _focus={{
            borderColor: hasError ? 'red.300' : 'brand.500',
            boxShadow: hasError ? '0 0 0 1px red.500' : '0 0 0 1px brand.500',
          }}
          {...props}
        />
        
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

Input.displayName = 'Input';

export default Input;
