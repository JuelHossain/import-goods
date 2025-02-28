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
  HStack,
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

type SignInFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { signIn, signInWithProvider } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) throw error;
      
      toast({
        title: 'Sign in successful.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to sign in. Please check your credentials and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      await signInWithProvider(provider);
      
      // Note: The actual redirect will be handled by Supabase OAuth
      // The toast below might not be shown as the page will redirect
      toast({
        title: `Redirecting to ${provider} login...`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast({
        title: 'An error occurred.',
        description: `Unable to sign in with ${provider}. Please try again later.`,
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
            <Heading fontSize="4xl">Sign in to your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy all of our cool features 
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
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                
                <Stack gap={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align="start"
                    justify="space-between"
                  >
                    <Checkbox
                      {...register('rememberMe')}
                    >
                      Remember me
                    </Checkbox>
                    <NextLink href="/auth/forgot-password" passHref>
                      <Text color="brand.500">Forgot password?</Text>
                    </NextLink>
                  </Stack>
                  
                  <Button
                    bg="brand.500"
                    color="white"
                    _hover={{
                      bg: 'brand.600',
                    }}
                    type="submit"
                    isLoading={isLoading}
                  >
                    Sign in
                  </Button>
                </Stack>
                
                <Stack pt={6}>
                  <Text textAlign="center">
                    Don&apos;t have an account?{' '}
                    <NextLink href="/auth/signup" passHref>
                      <Text as="span" color="brand.500">
                        Sign up
                      </Text>
                    </NextLink>
                  </Text>
                </Stack>
              </Stack>
            </form>
            
            <Stack gap={4} mt={8}>
              <Divider />
              <Text textAlign="center">Or sign in with</Text>
              <Stack gap={2}>
                <Button
                  w="full"
                  variant="outline"
                  leftIcon={<FaGoogle />}
                  onClick={() => handleSocialSignIn('google')}
                  isLoading={isLoading}
                >
                  Google
                </Button>
                <Button
                  w="full"
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={() => handleSocialSignIn('facebook')}
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
