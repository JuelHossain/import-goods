'use client';

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps as ChakraModalProps,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';
import Button from './Button';

/**
 * Extended modal props
 */
export interface ModalProps extends Omit<ChakraModalProps, 'children'> {
  /**
   * Title of the modal
   */
  title?: string;
  
  /**
   * Content of the modal
   */
  children: ReactNode;
  
  /**
   * Footer content of the modal
   */
  footer?: ReactNode;
  
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Whether to show the cancel button in the footer
   * @default true
   */
  showCancelButton?: boolean;
  
  /**
   * Text for the cancel button
   * @default 'Cancel'
   */
  cancelText?: string;
  
  /**
   * Whether to show the confirm button in the footer
   * @default false
   */
  showConfirmButton?: boolean;
  
  /**
   * Text for the confirm button
   * @default 'Confirm'
   */
  confirmText?: string;
  
  /**
   * Whether the confirm button is loading
   * @default false
   */
  isConfirmLoading?: boolean;
  
  /**
   * Callback for the confirm button
   */
  onConfirm?: () => void;
  
  /**
   * Size of the modal
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
}

/**
 * Custom modal component with standardized styling
 */
export const Modal = ({
  title,
  children,
  footer,
  showCloseButton = true,
  showCancelButton = true,
  cancelText = 'Cancel',
  showConfirmButton = false,
  confirmText = 'Confirm',
  isConfirmLoading = false,
  onConfirm,
  size = 'md',
  onClose,
  ...props
}: ModalProps) => {
  const colors = useCommonColors();
  
  // Generate default footer if not provided
  const defaultFooter = (
    <>
      {showCancelButton && (
        <Button
          variant="ghost"
          mr={3}
          onClick={() => onClose()}
        >
          {cancelText}
        </Button>
      )}
      {showConfirmButton && (
        <Button
          isPrimary
          isLoading={isConfirmLoading}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      )}
    </>
  );
  
  return (
    <ChakraModal
      size={size}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent bg={colors.cardBg}>
        {title && (
          <ModalHeader color={colors.textPrimary}>{title}</ModalHeader>
        )}
        {showCloseButton && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        {(footer || showCancelButton || showConfirmButton) && (
          <ModalFooter>
            {footer || defaultFooter}
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
