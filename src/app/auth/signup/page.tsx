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
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';

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
  const { signUp, signInWithProvider } = useAuth();
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
      const { error } = await signUp(data.email, data.password, {
        full_name: data.fullName,
      });
      
      if (error) throw error;
      
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
      await signInWithProvider(provider);
      
      // Note: The actual redirect will be handled by Supabase OAuth
      toast({
        title: `Redirecting to ${provider} login...`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(`Error signing up with ${provider}:`, error);
      toast({
        title: 'An error occurred.',
        description: `Unable to sign up with ${provider}. Please try again later.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container maxW="lg" py={{ base: 12, md: 24 }}>
        <Stack gap={8}>
          <Stack align="center">
            <Heading fontSize="4xl" textAlign="center">
              Create your account
            </Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg="white"
            _dark={{ bg: 'gray.700' }}
            boxShadow="lg"
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={4}>
                <FormControl isInvalid={!!errors.fullName} isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    {...register('fullName', {
                      required: 'Full name is required',
                    })}
                  />
                  <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
                </FormControl>
                
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
                
                <FormControl isInvalid={!!errors.password} isRequired>
                  <FormLabel>Password</FormLabel>
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
                
                <FormControl isInvalid={!!errors.agreeToTerms}>
                  <Checkbox
                    {...register('agreeToTerms', {
                      required: 'You must agree to the terms and conditions',
                    })}
                  >
                    I agree to the{' '}
                    <NextLink href="/terms" passHref>
                      <Text as="span" color="brand.500">
                        Terms and Conditions
                      </Text>
                    </NextLink>
                  </Checkbox>
                  <FormErrorMessage>{errors.agreeToTerms?.message}</FormErrorMessage>
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
                    Sign up
                  </Button>
                </Stack>
                
                <Stack pt={6}>
                  <Text textAlign="center">
                    Already a user?{' '}
                    <NextLink href="/auth/signin" passHref>
                      <Text as="span" color="brand.500">
                        Sign in
                      </Text>
                    </NextLink>
                  </Text>
                </Stack>
              </Stack>
            </form>
            
            <Stack gap={4} mt={8}>
              <Divider />
              <Text textAlign="center">Or sign up with</Text>
              <Stack gap={2}>
                <Button
                  w="full"
                  variant="outline"
                  leftIcon={<FaGoogle />}
                  onClick={() => handleSocialSignUp('google')}
                  isLoading={isLoading}
                >
                  Google
                </Button>
                <Button
                  w="full"
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={() => handleSocialSignUp('facebook')}
                  isLoading={isLoading}
                >
                  Facebook
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}
