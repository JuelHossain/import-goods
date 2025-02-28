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
      // Get the code and next parameters from the URL
      const code = searchParams.get('code');
      const next = searchParams.get('next') || '/';

      if (code) {
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
        // If there's no code, redirect to sign in
        router.push('/auth/signin');
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
