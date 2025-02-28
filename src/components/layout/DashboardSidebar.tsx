'use client';

import { ReactNode } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  BoxProps,
  FlexProps,
  Divider,
  VStack,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiShoppingCart,
  FiUsers,
  FiFileText,
  FiPackage,
  FiBarChart2,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useCommonColors } from '@/utils/colorModeValues';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  href: string;
  isActive?: boolean;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

// Dashboard navigation items
const DASHBOARD_ITEMS: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
  { name: 'Analytics', icon: FiBarChart2, href: '/dashboard/analytics' },
  { name: 'Orders', icon: FiShoppingCart, href: '/dashboard/orders' },
  { name: 'Products', icon: FiPackage, href: '/dashboard/products' },
  { name: 'Customers', icon: FiUsers, href: '/dashboard/customers' },
  { name: 'Invoices', icon: FiFileText, href: '/dashboard/invoices' },
];

// Additional navigation items
const SECONDARY_ITEMS: Array<LinkItemProps> = [
  { name: 'Explore', icon: FiCompass, href: '/dashboard/explore' },
  { name: 'Favorites', icon: FiStar, href: '/dashboard/favorites' },
  { name: 'Settings', icon: FiSettings, href: '/dashboard/settings' },
];

/**
 * Dashboard sidebar component
 */
export default function DashboardSidebar({ onClose, ...rest }: SidebarProps) {
  const colors = useCommonColors();
  const pathname = usePathname();

  return (
    <Box
      transition="0.3s ease"
      bg={colors.bgPrimary}
      borderRight="1px"
      borderRightColor={colors.borderColor}
      w={{ base: 'full', lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="xl"
          fontWeight="bold"
          color={colors.textPrimary}
        >
          Import Goods
        </Text>
        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>

      <VStack spacing={1} align="stretch" px={3}>
        {/* Main navigation items */}
        <Box py={2}>
          {DASHBOARD_ITEMS.map((item) => (
            <NavItem
              key={item.name}
              icon={item.icon}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.name}
            </NavItem>
          ))}
        </Box>

        <Divider borderColor={colors.borderColor} my={2} />

        {/* Secondary navigation items */}
        <Box py={2}>
          {SECONDARY_ITEMS.map((item) => (
            <NavItem
              key={item.name}
              icon={item.icon}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.name}
            </NavItem>
          ))}
        </Box>
      </VStack>

      {/* User profile section */}
      <Box
        position="absolute"
        bottom={0}
        w="full"
        p={4}
        borderTop="1px"
        borderTopColor={colors.borderColor}
      >
        <HStack spacing={3}>
          <Box
            w={10}
            h={10}
            borderRadius="md"
            bg={colors.primary}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
          >
            A
          </Box>
          <Box>
            <Text fontWeight="medium" color={colors.textPrimary}>Admin User</Text>
            <Text fontSize="xs" color={colors.textSecondary}>admin@importgoods.com</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

/**
 * Navigation item component
 */
const NavItem = ({ icon, children, href, isActive, ...rest }: NavItemProps) => {
  const colors = useCommonColors();
  
  return (
    <NextLink href={href} passHref>
      <Tooltip label={children} placement="right" hasArrow openDelay={500} display={{ base: 'none', lg: 'block' }}>
        <Flex
          align="center"
          p="3"
          mx="1"
          borderRadius="md"
          role="group"
          cursor="pointer"
          bg={isActive ? colors.bgActive : 'transparent'}
          color={isActive ? colors.primary : colors.textSecondary}
          _hover={{
            bg: colors.bgHover,
            color: colors.textPrimary,
          }}
          {...rest}
        >
          <Icon
            mr="3"
            fontSize="18"
            as={icon}
          />
          {children}
        </Flex>
      </Tooltip>
    </NextLink>
  );
};
