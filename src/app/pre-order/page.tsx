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
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  FormHelperText,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '@/components/layout/MainLayout';
import { FiDollarSign, FiPercent, FiPaperclip } from 'react-icons/fi';

type PreOrderFormData = {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  productLink: string;
  notes: string;
  price: string;
  discountCoupon: string;
  productImage?: FileList;
};

export default function PreOrderPage() {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
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
      //   price: formData.price,
      //   discount_coupon: formData.discountCoupon,
      //   // You would upload the image to storage and save the URL
      //   // image_url: uploadedImageUrl,
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
      setSelectedFileName('');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
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

                <FormControl isInvalid={!!errors.price} isRequired>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Expected Price</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color={useColorModeValue('gray.500', 'gray.400')}
                      children={<FiDollarSign />}
                    />
                    <Input 
                      {...register('price', {
                        required: 'Price is required',
                        pattern: {
                          value: /^[0-9]+(\.[0-9]{1,2})?$/,
                          message: 'Please enter a valid price'
                        }
                      })}
                      placeholder="0.00"
                      type="text"
                      bg={useColorModeValue('white', 'gray.800')}
                      borderColor={useColorModeValue('gray.300', 'gray.600')}
                      _hover={{
                        borderColor: useColorModeValue('gray.400', 'gray.500')
                      }}
                    />
                  </InputGroup>
                  <FormHelperText>Enter the expected price for this product</FormHelperText>
                  <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.discountCoupon}>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Discount Coupon</FormLabel>
                  <Input 
                    {...register('discountCoupon')}
                    placeholder="Enter coupon code"
                    type="text"
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('gray.400', 'gray.500')
                    }}
                  />
                  <FormHelperText>Enter any discount coupon code you have (optional)</FormHelperText>
                  <FormErrorMessage>{errors.discountCoupon?.message}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Product Image</FormLabel>
                  <Flex direction="column" gap={2}>
                    <input
                      type="file"
                      accept="image/*"
                      {...register('productImage')}
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      leftIcon={<FiPaperclip />}
                      variant="outline"
                      colorScheme="blue"
                      borderColor={useColorModeValue('gray.300', 'gray.600')}
                      _hover={{
                        borderColor: useColorModeValue('gray.400', 'gray.500')
                      }}
                    >
                      Browse Files
                    </Button>
                    {selectedFileName && (
                      <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                        Selected file: {selectedFileName}
                      </Text>
                    )}
                  </Flex>
                  <FormHelperText>Upload an image of the product (optional)</FormHelperText>
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
