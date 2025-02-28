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
  useColorMode,
  useToast,
  FormErrorMessage,
  Avatar,
  Flex,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EditIcon } from '@chakra-ui/icons';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

type ProfileFormData = {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const { user, updateProfile } = useAuth();
  const { colorMode } = useColorMode();
  
  const bgColor = colorMode === 'light' ? 'white' : 'gray.700';
  
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();

  useEffect(() => {
    if (user) {
      // Initialize form with user data
      reset({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        address: user.user_metadata?.address || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      await updateProfile({
        full_name: data.fullName,
        phone: data.phone,
        address: data.address,
      });
      
      toast({
        title: 'Profile updated.',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to update profile. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <Container maxW="container.md" py={{ base: 12, md: 24 }}>
          <Stack spacing={8}>
            <Heading fontSize="4xl" textAlign="center">Your Profile</Heading>
            <Box
              rounded="lg"
              bg={bgColor}
              boxShadow="lg"
              p={8}
            >
              <VStack spacing={6} align="stretch">
                <Flex justifyContent="center" mb={4}>
                  <Avatar 
                    size="2xl" 
                    name={user?.user_metadata?.full_name || user?.email?.charAt(0).toUpperCase()} 
                    src={user?.user_metadata?.avatar_url || ''}
                  />
                </Flex>
                
                <HStack justifyContent="space-between">
                  <Heading as="h3" size="md">Personal Information</Heading>
                  <IconButton
                    aria-label="Edit profile"
                    icon={<EditIcon />}
                    onClick={() => setIsEditing(!isEditing)}
                    variant="ghost"
                  />
                </HStack>
                
                <Divider />
                
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                      <FormControl id="fullName" isInvalid={!!errors.fullName}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          {...register('fullName', {
                            required: 'Full name is required',
                          })}
                        />
                        <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
                      </FormControl>
                      
                      <FormControl id="email" isReadOnly>
                        <FormLabel>Email</FormLabel>
                        <Input
                          {...register('email')}
                          readOnly
                        />
                        <Text fontSize="sm" color="gray.500" mt={1}>
                          Email cannot be changed
                        </Text>
                      </FormControl>
                      
                      <FormControl id="phone">
                        <FormLabel>Phone</FormLabel>
                        <Input
                          {...register('phone')}
                        />
                      </FormControl>
                      
                      <FormControl id="address">
                        <FormLabel>Address</FormLabel>
                        <Input
                          {...register('address')}
                        />
                      </FormControl>
                      
                      <Stack direction="row" spacing={4} pt={4}>
                        <Button
                          bg="brand.500"
                          color="white"
                          _hover={{
                            bg: 'brand.600',
                          }}
                          type="submit"
                          isLoading={isLoading}
                          flex={1}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          flex={1}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                ) : (
                  <Stack spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Full Name</Text>
                      <Text>{user?.user_metadata?.full_name || 'Not provided'}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Email</Text>
                      <Text>{user?.email}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Phone</Text>
                      <Text>{user?.user_metadata?.phone || 'Not provided'}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Address</Text>
                      <Text>{user?.user_metadata?.address || 'Not provided'}</Text>
                    </Box>
                  </Stack>
                )}
              </VStack>
            </Box>
          </Stack>
        </Container>
      </MainLayout>
    </ProtectedRoute>
  );
}
