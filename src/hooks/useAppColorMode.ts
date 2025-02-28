import { useColorMode as useChakraColorMode, useColorModeValue as useChakraColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

/**
 * Type definition for color mode
 */
export type ColorMode = 'light' | 'dark';

/**
 * Interface for color mode hook return value
 */
export interface ColorModeReturn {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  isReady: boolean;
}

/**
 * Detects system color mode preference
 */
const detectSystemColorMode = (): ColorMode => {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

/**
 * Custom hook that provides color mode functionality with fallback to light mode
 * when Chakra UI's useColorMode is not available
 */
export function useAppColorMode(): ColorModeReturn {
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      // Check system preference for dark mode on initial load
      setColorMode(detectSystemColorMode());
      setIsReady(true);
    } catch (error) {
      console.warn('Error detecting system color mode preference:', error);
      setIsReady(true);
    }
  }, []);

  // Try to use Chakra's useColorMode, fall back to our state if it fails
  try {
    const { colorMode: chakraColorMode, toggleColorMode: chakraToggleColorMode } = useChakraColorMode();
    
    return {
      colorMode: chakraColorMode as ColorMode,
      toggleColorMode: chakraToggleColorMode,
      isReady: true
    };
  } catch (error) {
    // If Chakra's hook fails, use our own implementation
    console.warn('Chakra useColorMode not available, using fallback implementation');
    
    const toggleColorMode = () => {
      setColorMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return {
      colorMode,
      toggleColorMode,
      isReady
    };
  }
}

/**
 * Custom hook that provides color values based on current color mode with fallback
 * when Chakra UI's useColorModeValue is not available
 */
export function useAppColorModeValue<T>(lightValue: T, darkValue: T): T {
  const { colorMode } = useAppColorMode();
  
  try {
    // Try to use Chakra's useColorModeValue
    return useChakraColorModeValue(lightValue, darkValue);
  } catch (error) {
    // If Chakra's hook fails, use our own implementation
    return colorMode === 'light' ? lightValue : darkValue;
  }
}
