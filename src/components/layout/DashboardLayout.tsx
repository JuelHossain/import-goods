'use client';

import { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useCommonColors } from '@/utils/colorModeValues';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Dashboard layout with sidebar and navbar
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarWidth] = useState(260);
  const colors = useCommonColors();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box minH="100vh" bg={colors.bgSecondary}>
      {/* Mobile sidebar */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <DashboardSidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Desktop sidebar */}
      {!isMobile && (
        <Box
          position="fixed"
          left={0}
          w={`${sidebarWidth}px`}
          h="full"
          display={{ base: 'none', lg: 'block' }}
        >
          <DashboardSidebar onClose={() => onClose} />
        </Box>
      )}

      {/* Mobile nav */}
      <Box
        ml={{ base: 0, lg: `${sidebarWidth}px` }}
        transition="margin-left .3s ease"
      >
        <Flex
          position="sticky"
          top={0}
          zIndex="sticky"
          bg={colors.bgPrimary}
          h="60px"
          alignItems="center"
          justifyContent={{ base: 'space-between', lg: 'flex-end' }}
          px={4}
          borderBottomWidth="1px"
          borderBottomColor={colors.borderColor}
          boxShadow="sm"
        >
          {isMobile && (
            <IconButton
              aria-label="Open Menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
            />
          )}
          <DashboardNavbar />
        </Flex>

        <Box p={4} pt={5}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
