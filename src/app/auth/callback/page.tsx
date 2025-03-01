'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the code and next parameters from the URL
        const code = searchParams.get('code');
        const next = searchParams.get('next') || '/';

        if (code && supabase) {
          try {
            // Exchange the code for a session
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            
            if (error) {
              console.error('Error exchanging code for session:', error);
              router.push('/auth/signin?error=Authentication%20failed');
              return;
            }
            
            // Redirect to the next URL or home page
            router.push(next);
          } catch (error) {
            console.error('Error during auth callback:', error);
            router.push('/auth/signin?error=Authentication%20failed');
          }
        } else {
          // For static site generation or if Supabase is not configured
          console.log('Mock auth or missing Supabase client, redirecting to home');
          router.push('/');
        }
      } catch (error) {
        console.error('General error in auth callback:', error);
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Spinner size="xl" color="brand.500" />
        <Text>Completing authentication, please wait...</Text>
      </VStack>
    </Center>
  );
}
