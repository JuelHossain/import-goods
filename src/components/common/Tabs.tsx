'use client';

import {
  Tabs as ChakraTabs,
  TabsProps as ChakraTabsProps,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Tab item interface
 */
export interface TabItem {
  /**
   * Label of the tab
   */
  label: string;
  
  /**
   * Content of the tab
   */
  content: ReactNode;
  
  /**
   * Whether the tab is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Extended tabs props
 */
export interface CustomTabsProps extends Omit<ChakraTabsProps, 'children'> {
  /**
   * Array of tab items
   */
  tabs: TabItem[];
  
  /**
   * Variant of the tabs
   * @default 'line'
   */
  variant?: 'line' | 'enclosed' | 'enclosed-colored' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
  
  /**
   * Whether to show the tab panels
   * @default true
   */
  showPanels?: boolean;
  
  /**
   * Whether to fit the tabs to the container width
   * @default false
   */
  isFitted?: boolean;
  
  /**
   * Whether to use a card style for the tabs
   * @default false
   */
  isCard?: boolean;
}

/**
 * Custom tabs component with standardized styling
 */
export const Tabs = ({
  tabs,
  variant = 'line',
  showPanels = true,
  isFitted = false,
  isCard = false,
  ...props
}: CustomTabsProps) => {
  const colors = useCommonColors();
  
  return (
    <Box
      borderRadius={isCard ? 'md' : undefined}
      boxShadow={isCard ? 'sm' : undefined}
      bg={isCard ? colors.cardBg : undefined}
      p={isCard ? 4 : undefined}
    >
      <ChakraTabs
        variant={variant}
        colorScheme="blue"
        isFitted={isFitted}
        {...props}
      >
        <TabList
          borderBottomColor={colors.borderColor}
          mb={isCard ? 4 : 0}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              isDisabled={tab.isDisabled}
              color={colors.textSecondary}
              _selected={{
                color: colors.primary,
                borderColor: colors.primary,
                fontWeight: 'medium',
              }}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        
        {showPanels && (
          <TabPanels>
            {tabs.map((tab, index) => (
              <TabPanel key={index} px={isCard ? 0 : undefined}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        )}
      </ChakraTabs>
    </Box>
  );
};

export default Tabs;
