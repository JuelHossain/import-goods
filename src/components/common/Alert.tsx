'use client';

import {
  Alert as ChakraAlert,
  AlertProps as ChakraAlertProps,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';

/**
 * Extended alert props
 */
export interface AlertProps extends ChakraAlertProps {
  /**
   * Title of the alert
   */
  title?: string;
  
  /**
   * Description of the alert
   */
  description?: string;
  
  /**
   * Whether the alert is dismissible
   * @default false
   */
  isDismissible?: boolean;
  
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
}

/**
 * Custom alert component with standardized styling
 */
export const Alert = ({
  title,
  description,
  isDismissible = false,
  onDismiss,
  status = 'info',
  variant = 'subtle',
  ...props
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <ChakraAlert
      status={status}
      variant={variant}
      flexDirection="column"
      alignItems="flex-start"
      position="relative"
      p={4}
      borderRadius="md"
      {...props}
    >
      <Box display="flex" width="100%">
        <AlertIcon />
        {title && <AlertTitle mr={2}>{title}</AlertTitle>}
        {isDismissible && (
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={handleDismiss}
          />
        )}
      </Box>
      {description && (
        <AlertDescription mt={2}>
          {description}
        </AlertDescription>
      )}
    </ChakraAlert>
  );
};

export default Alert;
