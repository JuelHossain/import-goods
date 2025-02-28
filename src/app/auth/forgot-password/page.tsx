'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import {
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your authentication service
      await resetPassword(data.email);
      setIsEmailSent(true);
      
      // In a real app, you would show a toast notification
      console.log({
        title: 'Reset email sent.',
        description: "We&apos;ve sent you an email with a link to reset your password.",
        status: 'success',
      });
    } catch (error) {
      console.error('Error sending reset email:', error);
      console.log({
        title: 'An error occurred.',
        description: 'Unable to send reset email. Please try again later.',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container maxW="lg" py={{ base: '12', md: '24' }}>
        <Stack gap={8}>
          <Stack align="center">
            <Heading fontSize="4xl">Forgot your password?</Heading>
            <Text fontSize="lg" color="gray.600">
              We&apos;ll send you a reset link
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg="white"
            _dark={{ bg: 'gray.700' }}
            boxShadow="lg"
            p={8}
          >
            {isEmailSent ? (
              <Stack gap={4} textAlign="center">
                <Heading as="h4" size="md">
                  Check your email
                </Heading>
                <Text>
                  We&apos;ve sent a password reset link to your email address. Please check your inbox.
                </Text>
                <Text mt={4}>
                  Didn&apos;t receive an email?{' '}
                  <Button
                    variant="link"
                    color="brand.500"
                    onClick={() => setIsEmailSent(false)}
                  >
                    Try again
                  </Button>
                </Text>
              </Stack>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4}>
                  <FormControl isInvalid={!!errors.email} isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                  
                  <Stack gap={10}>
                    <Button
                      bg="brand.500"
                      color="white"
                      _hover={{
                        bg: 'brand.600',
                      }}
                      type="submit"
                      isLoading={isLoading}
                    >
                      Send reset link
                    </Button>
                  </Stack>
                  
                  <Stack pt={6}>
                    <Text textAlign="center">
                      Remember your password?{' '}
                      <NextLink href="/auth/signin" passHref>
                        <Text as="span" color="brand.500">
                          Sign in
                        </Text>
                      </NextLink>
                    </Text>
                  </Stack>
                </Stack>
              </form>
            )}
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}
