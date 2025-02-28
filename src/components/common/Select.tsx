'use client';

import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Option interface for select options
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Extended select props
 */
export interface SelectProps extends Omit<ChakraSelectProps, 'children'> {
  /**
   * Label for the select
   */
  label?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  
  /**
   * Whether the select is required
   * @default false
   */
  isRequired?: boolean;
  
  /**
   * Whether the form control should take the full width
   * @default true
   */
  isFullWidth?: boolean;
  
  /**
   * Options for the select
   */
  options: SelectOption[];
  
  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Custom select component with standardized styling and form control
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    error,
    helperText,
    isRequired = false,
    isFullWidth = true,
    isInvalid,
    options,
    placeholder = 'Select an option',
    ...props
  }, ref) => {
    const colors = useCommonColors();
    
    // Determine if the select is invalid based on the error prop or isInvalid prop
    const hasError = !!error || isInvalid;
    
    return (
      <FormControl 
        isInvalid={hasError} 
        isRequired={isRequired}
        width={isFullWidth ? 'full' : 'auto'}
        mb={3}
      >
        {label && <FormLabel>{label}</FormLabel>}
        
        <ChakraSelect
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
          placeholder={placeholder}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ChakraSelect>
        
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

Select.displayName = 'Select';

export default Select;
