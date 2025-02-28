'use client';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  HStack,
  VStack,
  useColorModeValue,
  InputGroup,
  Input,
  InputRightElement,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import {
  BellIcon,
  SearchIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { FiMail, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useAppColorMode } from '@/hooks/useAppColorMode';
import { useCommonColors } from '@/utils/colorModeValues';

/**
 * Dashboard navbar component
 */
export default function DashboardNavbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useAppColorMode();
  const colors = useCommonColors();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Search */}
      <InputGroup maxW="400px" display={{ base: 'none', md: 'flex' }}>
        <Input
          placeholder="Search..."
          bg={colors.inputBg}
          border="1px"
          borderColor={colors.borderColor}
          _placeholder={{ color: colors.textSecondary }}
        />
        <InputRightElement>
          <SearchIcon color={colors.textSecondary} />
        </InputRightElement>
      </InputGroup>

      <HStack spacing={3}>
        {/* Color mode toggle */}
        <Tooltip label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}>
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            variant="ghost"
            color={colors.textSecondary}
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />
        </Tooltip>

        {/* Notifications */}
        <Menu>
          <Tooltip label="Notifications">
            <Box position="relative">
              <MenuButton
                as={IconButton}
                size="md"
                fontSize="lg"
                variant="ghost"
                color={colors.textSecondary}
                icon={<BellIcon />}
              />
              <Badge
                position="absolute"
                top="-2px"
                right="-2px"
                colorScheme="red"
                variant="solid"
                fontSize="xs"
                borderRadius="full"
                w={4}
                h={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                3
              </Badge>
            </Box>
          </Tooltip>
          <MenuList
            bg={colors.cardBg}
            borderColor={colors.borderColor}
            boxShadow="md"
            zIndex={100}
          >
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">New Order</Text>
                <Text fontSize="sm" color={colors.textSecondary}>Order #12345 has been placed</Text>
              </VStack>
            </MenuItem>
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">Payment Received</Text>
                <Text fontSize="sm" color={colors.textSecondary}>Payment for order #12344 received</Text>
              </VStack>
            </MenuItem>
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">Shipment Update</Text>
                <Text fontSize="sm" color={colors.textSecondary}>Order #12343 has been shipped</Text>
              </VStack>
            </MenuItem>
            <MenuDivider />
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>
              <Text color={colors.primary}>View all notifications</Text>
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Messages */}
        <Menu>
          <Tooltip label="Messages">
            <Box position="relative">
              <MenuButton
                as={IconButton}
                size="md"
                fontSize="lg"
                variant="ghost"
                color={colors.textSecondary}
                icon={<FiMail />}
              />
              <Badge
                position="absolute"
                top="-2px"
                right="-2px"
                colorScheme="blue"
                variant="solid"
                fontSize="xs"
                borderRadius="full"
                w={4}
                h={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                2
              </Badge>
            </Box>
          </Tooltip>
          <MenuList
            bg={colors.cardBg}
            borderColor={colors.borderColor}
            boxShadow="md"
            zIndex={100}
          >
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">John Doe</Text>
                <Text fontSize="sm" color={colors.textSecondary}>Regarding order #12345</Text>
              </VStack>
            </MenuItem>
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">Jane Smith</Text>
                <Text fontSize="sm" color={colors.textSecondary}>Product inquiry</Text>
              </VStack>
            </MenuItem>
            <MenuDivider />
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>
              <Text color={colors.primary}>View all messages</Text>
            </MenuItem>
          </MenuList>
        </Menu>

        {/* User profile */}
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: 'none' }}
          >
            <HStack spacing={3}>
              <Avatar
                size="sm"
                name={user?.email || 'Admin User'}
                bg={colors.primary}
                color="white"
              />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing={0}
                ml="2"
              >
                <Text fontSize="sm" fontWeight="medium">
                  {user?.email ? user.email.split('@')[0] : 'Admin User'}
                </Text>
                <Text fontSize="xs" color={colors.textSecondary}>
                  Administrator
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={colors.cardBg}
            borderColor={colors.borderColor}
            boxShadow="md"
            zIndex={100}
          >
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>Profile</MenuItem>
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>Settings</MenuItem>
            <MenuItem bg={colors.cardBg} _hover={{ bg: colors.bgHover }}>Billing</MenuItem>
            <MenuDivider />
            <MenuItem 
              bg={colors.cardBg} 
              _hover={{ bg: colors.bgHover }}
              onClick={handleSignOut}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
