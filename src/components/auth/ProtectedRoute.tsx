'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Spinner } from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      router.push('/auth/signin');
    } else if (!isLoading && adminOnly && user?.app_metadata?.role !== 'admin') {
      // Redirect to home if not an admin and trying to access admin-only route
      router.push('/');
    }
  }, [user, isLoading, router, adminOnly]);

  // Show loading spinner while checking authentication
  if (isLoading || !user) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  // If admin-only and user is not admin, don't render anything (redirecting)
  if (adminOnly && user?.app_metadata?.role !== 'admin') {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
}
