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
  useColorModeValue,
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
            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              Can't find what you're looking for? Submit a pre-order request and we'll source it for you.
            </Text>
          </Box>

          <Box 
            bg={useColorModeValue('white', 'gray.700')} 
            p={8} 
            borderRadius="md" 
            boxShadow="md"
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <Heading as="h3" size="md" color={useColorModeValue('gray.800', 'white')}>
                  Contact Information
                </Heading>
                
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Full Name</FormLabel>
                  <Input 
                    {...register('name', { 
                      required: 'Name is required' 
                    })} 
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('gray.400', 'gray.500')
                    }}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email} isRequired>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Email Address</FormLabel>
                  <Input 
                    type="email" 
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      }
                    })} 
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('gray.400', 'gray.500')
                    }}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone} isRequired>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Phone Number</FormLabel>
                  <Input 
                    type="tel" 
                    {...register('phone', { 
                      required: 'Phone number is required' 
                    })} 
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('gray.400', 'gray.500')
                    }}
                  />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.shippingAddress} isRequired>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Shipping Address</FormLabel>
                  <Textarea 
                    {...register('shippingAddress', { 
                      required: 'Shipping address is required' 
                    })} 
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('gray.400', 'gray.500')
                    }}
                  />
                  <FormErrorMessage>{errors.shippingAddress?.message}</FormErrorMessage>
                </FormControl>

                <Divider my={4} borderColor={useColorModeValue('gray.200', 'gray.600')} />

                <Heading as="h3" size="md" color={useColorModeValue('gray.800', 'white')}>
                  Product Information
                </Heading>

                <FormControl isInvalid={!!errors.productLink} isRequired>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Product Link</FormLabel>
                  <Input 
                    {...register('productLink', { 
                      required: 'Product link is required' 
                    })} 
                    placeholder="https://example.com/product"
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('gray.400', 'gray.500')
                    }}
                  />
                  <FormErrorMessage>{errors.productLink?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.notes}>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Additional Notes</FormLabel>
                  <Textarea 
                    {...register('notes')} 
                    placeholder="Provide any additional details about your request..."
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('gray.400', 'gray.500')
                    }}
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
