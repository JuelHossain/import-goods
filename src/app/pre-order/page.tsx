'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
  FormErrorMessage,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '@/components/layout/MainLayout';

type PreOrderFormData = {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  productLink: string;
  notes: string;
};

export default function PreOrderPage() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PreOrderFormData>();

  const onSubmit = async (formData: PreOrderFormData) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would use Supabase to store the pre-order
      // const { error } = await supabase.from('pre_orders').insert({
      //   name: formData.name,
      //   email: formData.email,
      //   phone: formData.phone,
      //   shipping_address: formData.shippingAddress,
      //   product_link: formData.productLink,
      //   notes: formData.notes,
      //   status: 'pending',
      // });
      
      // if (error) throw error;
      
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Pre-order submitted!',
        description: `Thank you ${formData.name}, we'll contact you soon about your request.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      reset();
    } catch (error) {
      console.error('Error submitting pre-order:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to submit your pre-order. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={4}>
              Pre-Order Form
            </Heading>
            <Text color="gray.600">
              Can't find what you're looking for? Submit a pre-order request and we'll source it for you.
            </Text>
          </Box>

          <Box bg="white" p={8} borderRadius="md" boxShadow="md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <Heading as="h3" size="md">
                  Contact Information
                </Heading>
                
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input 
                    {...register('name', { 
                      required: 'Name is required' 
                    })} 
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email} isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input 
                    type="email" 
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      }
                    })} 
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone} isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input 
                    type="tel" 
                    {...register('phone', { 
                      required: 'Phone number is required' 
                    })} 
                  />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.shippingAddress} isRequired>
                  <FormLabel>Shipping Address</FormLabel>
                  <Textarea 
                    {...register('shippingAddress', { 
                      required: 'Shipping address is required' 
                    })} 
                  />
                  <FormErrorMessage>{errors.shippingAddress?.message}</FormErrorMessage>
                </FormControl>

                <Divider my={4} />

                <Heading as="h3" size="md">
                  Product Information
                </Heading>

                <FormControl isInvalid={!!errors.productLink} isRequired>
                  <FormLabel>Product Link</FormLabel>
                  <Input 
                    {...register('productLink', { 
                      required: 'Product link is required' 
                    })} 
                    placeholder="https://example.com/product"
                  />
                  <FormErrorMessage>{errors.productLink?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.notes}>
                  <FormLabel>Additional Notes</FormLabel>
                  <Textarea 
                    {...register('notes')} 
                    placeholder="Provide any additional details about your request..."
                  />
                  <FormErrorMessage>{errors.notes?.message}</FormErrorMessage>
                </FormControl>

                <Button
                  mt={4}
                  colorScheme="blue"
                  bg="brand.500"
                  _hover={{ bg: 'brand.600' }}
                  isLoading={isSubmitting}
                  type="submit"
                  size="lg"
                >
                  Submit Pre-Order
                </Button>
              </Stack>
            </form>
          </Box>
        </VStack>
      </Container>
    </MainLayout>
  );
}
