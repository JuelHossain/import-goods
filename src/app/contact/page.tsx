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
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const formBackground = useColorModeValue('white', 'gray.700');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send this data to your backend
    toast({
      title: 'Message sent',
      description: 'We\'ll get back to you as soon as possible.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    setIsSubmitting(false);
    // Reset form (In a real app, you would clear the form inputs)
  };

  return (
    <MainLayout>
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl">Contact Us</Heading>
            <Text mt={4} fontSize="lg">
              Have questions about our products or services? Get in touch with our team.
            </Text>
          </Box>

          <Box 
            as="form" 
            onSubmit={handleSubmit}
            bg={formBackground}
            p={8}
            borderRadius="lg"
            boxShadow="md"
          >
            <Stack spacing={6}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                  placeholder="Your name" 
                  focusBorderColor="brand.500" 
                />
              </FormControl>
              
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  placeholder="your.email@example.com" 
                  focusBorderColor="brand.500" 
                />
              </FormControl>
              
              <FormControl id="subject" isRequired>
                <FormLabel>Subject</FormLabel>
                <Input 
                  placeholder="What is this regarding?" 
                  focusBorderColor="brand.500" 
                />
              </FormControl>
              
              <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea 
                  placeholder="Please describe your inquiry in detail..."
                  focusBorderColor="brand.500"
                  rows={6}
                />
              </FormControl>
              
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                isLoading={isSubmitting}
                loadingText="Sending"
              >
                Send Message
              </Button>
            </Stack>
          </Box>

          <Box mt={8}>
            <Heading as="h2" size="md" mb={4}>Other Ways to Reach Us</Heading>
            
            <Stack spacing={4}>
              <Box>
                <Text fontWeight="bold">Email</Text>
                <Text>support@importgoods.com</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold">Phone</Text>
                <Text>+1 (555) 123-4567</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold">Address</Text>
                <Text>123 Import Avenue, Suite 400<br />San Francisco, CA 94107</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold">Business Hours</Text>
                <Text>Monday–Friday: 9:00AM–5:00PM PST</Text>
              </Box>
            </Stack>
          </Box>
        </VStack>
      </Container>
    </MainLayout>
  );
}
