'use client';

import { ReactNode } from 'react';
import { AuthContext, useProvideAuth } from '@/hooks/useAuth';
import { Box, Spinner, Center } from '@chakra-ui/react';

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode;
  /**
   * Whether to show a loading spinner when auth is initializing
   * @default true
   */
  showLoadingSpinner?: boolean;
}

/**
 * AuthProvider component that provides authentication context to the application
 */
export default function AuthProvider({ 
  children, 
  showLoadingSpinner = true 
}: AuthProviderProps) {
  const auth = useProvideAuth();

  // Show loading spinner while auth is initializing
  if (auth.isLoading && showLoadingSpinner) {
    return (
      <Center h="100vh">
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
