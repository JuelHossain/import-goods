import { useAppColorModeValue } from '@/hooks/useAppColorMode';

/**
 * Interface for common colors used throughout the application
 */
export interface CommonColors {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  
  // Border colors
  borderPrimary: string;
  borderSecondary: string;
  
  // Card and container colors
  cardBg: string;
  containerBg: string;
  
  // Input colors
  inputBg: string;
  inputBorder: string;
  
  // Hover colors
  hoverBg: string;
  
  // Shadow
  shadow: string;
}

/**
 * Default color values for light and dark modes
 */
export const COLOR_VALUES = {
  light: {
    bg: {
      primary: 'white',
      secondary: 'gray.50',
      tertiary: 'gray.100',
    },
    text: {
      primary: 'gray.800',
      secondary: 'gray.600',
      tertiary: 'gray.500',
    },
    border: {
      primary: 'gray.200',
      secondary: 'gray.300',
    },
    card: 'white',
    container: 'gray.50',
    input: {
      bg: 'white',
      border: 'gray.200',
    },
    hover: 'gray.100',
    shadow: 'md',
  },
  dark: {
    bg: {
      primary: 'gray.800',
      secondary: 'gray.900',
      tertiary: 'gray.700',
    },
    text: {
      primary: 'white',
      secondary: 'gray.300',
      tertiary: 'gray.400',
    },
    border: {
      primary: 'gray.700',
      secondary: 'gray.600',
    },
    card: 'gray.800',
    container: 'gray.900',
    input: {
      bg: 'gray.700',
      border: 'gray.600',
    },
    hover: 'gray.700',
    shadow: 'dark-lg',
  },
};

/**
 * Hook that provides common color values used throughout the application
 */
export const useCommonColors = (): CommonColors => {
  // Background colors
  const bgPrimary = useAppColorModeValue(COLOR_VALUES.light.bg.primary, COLOR_VALUES.dark.bg.primary);
  const bgSecondary = useAppColorModeValue(COLOR_VALUES.light.bg.secondary, COLOR_VALUES.dark.bg.secondary);
  const bgTertiary = useAppColorModeValue(COLOR_VALUES.light.bg.tertiary, COLOR_VALUES.dark.bg.tertiary);
  
  // Text colors
  const textPrimary = useAppColorModeValue(COLOR_VALUES.light.text.primary, COLOR_VALUES.dark.text.primary);
  const textSecondary = useAppColorModeValue(COLOR_VALUES.light.text.secondary, COLOR_VALUES.dark.text.secondary);
  const textTertiary = useAppColorModeValue(COLOR_VALUES.light.text.tertiary, COLOR_VALUES.dark.text.tertiary);
  
  // Border colors
  const borderPrimary = useAppColorModeValue(COLOR_VALUES.light.border.primary, COLOR_VALUES.dark.border.primary);
  const borderSecondary = useAppColorModeValue(COLOR_VALUES.light.border.secondary, COLOR_VALUES.dark.border.secondary);
  
  // Card and container colors
  const cardBg = useAppColorModeValue(COLOR_VALUES.light.card, COLOR_VALUES.dark.card);
  const containerBg = useAppColorModeValue(COLOR_VALUES.light.container, COLOR_VALUES.dark.container);
  
  // Input colors
  const inputBg = useAppColorModeValue(COLOR_VALUES.light.input.bg, COLOR_VALUES.dark.input.bg);
  const inputBorder = useAppColorModeValue(COLOR_VALUES.light.input.border, COLOR_VALUES.dark.input.border);
  
  // Hover colors
  const hoverBg = useAppColorModeValue(COLOR_VALUES.light.hover, COLOR_VALUES.dark.hover);
  
  // Shadow
  const shadow = useAppColorModeValue(COLOR_VALUES.light.shadow, COLOR_VALUES.dark.shadow);
  
  return {
    // Background
    bgPrimary,
    bgSecondary,
    bgTertiary,
    
    // Text
    textPrimary,
    textSecondary,
    textTertiary,
    
    // Border
    borderPrimary,
    borderSecondary,
    
    // Card and container
    cardBg,
    containerBg,
    
    // Input
    inputBg,
    inputBorder,
    
    // Hover
    hoverBg,
    
    // Shadow
    shadow,
  };
};
