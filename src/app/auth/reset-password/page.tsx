'use client';

import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Input,
  Heading,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetComplete, setIsResetComplete] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updatePassword } = useAuth();
  
  const token = searchParams?.get('token');
  
  useEffect(() => {
    if (!token) {
      toast({
        title: 'Invalid reset link.',
        description: 'The password reset link is invalid or has expired.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      router.push('/auth/forgot-password');
    }
  }, [token, toast, router]);
  
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();
  
  const password = watch('password');

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const { error } = await updatePassword(data.password);
      
      if (error) throw error;
      
      setIsResetComplete(true);
      toast({
        title: 'Password reset successful.',
        description: 'Your password has been reset successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to reset your password. The link may have expired.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container maxW="lg" py={{ base: 12, md: 24 }}>
        <Stack gap={8}>
          <Stack align="center">
            <Heading fontSize="4xl">Reset your password</Heading>
            <Text fontSize="lg" color="gray.600">
              Enter your new password below
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg="white"
            _dark={{ bg: 'gray.700' }}
            boxShadow="lg"
            p={8}
          >
            {isResetComplete ? (
              <Stack gap={4} textAlign="center">
                <Heading as="h4" size="md">
                  Password Reset Complete
                </Heading>
                <Text>
                  Your password has been reset successfully. You can now sign in with your new password.
                </Text>
                <Button
                  mt={4}
                  bg="brand.500"
                  color="white"
                  _hover={{
                    bg: 'brand.600',
                  }}
                  onClick={() => router.push('/auth/signin')}
                >
                  Go to Sign In
                </Button>
              </Stack>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4}>
                  <FormControl isInvalid={!!errors.password} isRequired>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={!!errors.confirmPassword} isRequired>
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input
                      type="password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match',
                      })}
                    />
                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                  </FormControl>
                  
                  <Stack gap={10} pt={2}>
                    <Button
                      bg="brand.500"
                      color="white"
                      _hover={{
                        bg: 'brand.600',
                      }}
                      type="submit"
                      isLoading={isLoading}
                    >
                      Reset Password
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
