'use client';

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import NextLink from 'next/link';
import { useAppColorModeValue } from '@/hooks/useAppColorMode';
import { useCommonColors } from '@/utils/colorModeValues';

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useAppColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useAppColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const colors = useCommonColors();
  
  return (
    <Box
      bg={colors.bgSecondary}
      color={colors.textSecondary}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link as={NextLink} href={'/about'}>About Us</Link>
            <Link as={NextLink} href={'/blog'}>Blog</Link>
            <Link as={NextLink} href={'/contact'}>Contact Us</Link>
            <Link as={NextLink} href={'/pricing'}>Pricing</Link>
            <Link as={NextLink} href={'/testimonials'}>Testimonials</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link as={NextLink} href={'/help'}>Help Center</Link>
            <Link as={NextLink} href={'/terms'}>Terms of Service</Link>
            <Link as={NextLink} href={'/legal'}>Legal</Link>
            <Link as={NextLink} href={'/privacy'}>Privacy Policy</Link>
            <Link as={NextLink} href={'/status'}>Status</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Products</ListHeader>
            <Link as={NextLink} href={'/products'}>All Products</Link>
            <Link as={NextLink} href={'/products/new'}>New Arrivals</Link>
            <Link as={NextLink} href={'/products/bestsellers'}>Best Sellers</Link>
            <Link as={NextLink} href={'/pre-order'}>Pre-Order</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Stay Connected</ListHeader>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={colors.borderPrimary}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text> {new Date().getFullYear()} Import Goods. All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  );
}
