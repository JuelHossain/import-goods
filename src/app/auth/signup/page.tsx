'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  HStack,
  Checkbox,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { supabase } from '@/lib/supabase';

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    if (!data.agreeToTerms) {
      toast({
        title: 'Terms and conditions required.',
        description: 'You must agree to the terms and conditions to sign up.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would use Supabase authentication
      // const { error } = await supabase.auth.signUp({
      //   email: data.email,
      //   password: data.password,
      //   options: {
      //     data: {
      //       full_name: data.fullName,
      //     },
      //   },
      // });
      
      // if (error) throw error;
      
      // For now, we'll just simulate a successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Account created.',
        description: "We've created your account. Please check your email to verify your account.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      router.push('/auth/signin');
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to create your account. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      // In a real app, you would use Supabase social authentication
      // const { error } = await supabase.auth.signInWithOAuth({
      //   provider,
      // });
      
      // if (error) throw error;
      
      // For now, we'll just simulate a successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: `Sign up with ${provider} successful.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      router.push('/');
    } catch (error) {
      console.error(`Error signing up with ${provider}:`, error);
      toast({
        title: 'An error occurred.',
        description: `Unable to sign up with ${provider}. Please try again later.`,
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
        <Stack spacing={8}>
          <Stack align="center">
            <Heading fontSize="4xl">Create your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to start importing quality goods from around the world ✨
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl id="fullName" isInvalid={!!errors.fullName} isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type="text"
                      {...register('fullName', {
                        required: 'Full name is required',
                      })}
                    />
                    <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl id="email" isInvalid={!!errors.email} isRequired>
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
                  
                  <FormControl id="password" isInvalid={!!errors.password} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match',
                      })}
                    />
                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl id="agreeToTerms" isInvalid={!!errors.agreeToTerms}>
                    <Checkbox
                      {...register('agreeToTerms', {
                        required: 'You must agree to the terms and conditions',
                      })}
                    >
                      I agree to the{' '}
                      <NextLink href="/terms" passHref>
                        <Text as="span" color="brand.500">
                          Terms of Service
                        </Text>
                      </NextLink>{' '}
                      and{' '}
                      <NextLink href="/privacy" passHref>
                        <Text as="span" color="brand.500">
                          Privacy Policy
                        </Text>
                      </NextLink>
                    </Checkbox>
                    <FormErrorMessage>{errors.agreeToTerms?.message}</FormErrorMessage>
                  </FormControl>
                  
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg="brand.500"
                      color="white"
                      _hover={{
                        bg: 'brand.600',
                      }}
                      type="submit"
                      isLoading={isLoading}
                    >
                      Sign up
                    </Button>
                  </Stack>
                </Stack>
              </form>

              <Stack pt={6}>
                <Text align="center">
                  Already a user?{' '}
                  <NextLink href="/auth/signin" passHref>
                    <Text as="span" color="brand.500">
                      Sign in
                    </Text>
                  </NextLink>
                </Text>
              </Stack>

              <Divider my={6} />

              <Stack spacing={4}>
                <Button
                  w="full"
                  variant="outline"
                  leftIcon={<FaGoogle />}
                  onClick={() => handleSocialSignUp('google')}
                  isLoading={isLoading}
                >
                  Sign up with Google
                </Button>
                <Button
                  w="full"
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={() => handleSocialSignUp('facebook')}
                  isLoading={isLoading}
                >
                  Sign up with Facebook
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}
