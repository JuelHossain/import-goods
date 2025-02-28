import { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Import supabase conditionally to avoid initialization errors
let supabase: any;
try {
  supabase = require('@/lib/supabase').supabase;
} catch (error) {
  console.warn('Supabase client initialization failed, using mock auth');
}

/**
 * Authentication response interface
 */
export interface AuthResponse<T = any> {
  error: Error | null;
  data: T | null;
}

/**
 * Authentication context interface
 */
export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse<Session>>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<AuthResponse<Session>>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  updatePassword: (password: string) => Promise<AuthResponse>;
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>;
}

/**
 * Create a mock user for development
 */
const createMockUser = (email: string = 'mock@example.com'): User => ({
  id: 'mock-user-id',
  email,
  user_metadata: {
    full_name: 'Mock User',
  },
} as User);

/**
 * Create a mock session for development
 */
const createMockSession = (user: User): Session => ({ 
  user
} as Session);

/**
 * Authentication context
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to use authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Provider hook that creates auth object and handles state
 */
export const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  /**
   * Initialize session
   */
  const initializeSession = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (supabase) {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (session) {
          setSession(session);
          setUser(session.user);
        }
      } else {
        // Mock session for development
        console.log('Using mock session for development');
        // Create a mock session after a delay to simulate loading
        setTimeout(() => {
          const mockUser = createMockUser();
          setUser(mockUser);
          setSession(createMockSession(mockUser));
        }, 1000);
      }
    } catch (error) {
      console.error('Session retrieval error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Set up auth state change listener
   */
  useEffect(() => {
    // Get session from Supabase
    initializeSession();

    // Set up listener for auth state changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event: string, session: Session | null) => {
          if (session) {
            setSession(session);
            setUser(session.user);
          } else {
            setSession(null);
            setUser(null);
          }
          setIsLoading(false);
        }
      );

      return () => {
        subscription?.unsubscribe();
      };
    }
  }, []);

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<AuthResponse<Session>> => {
    try {
      if (supabase) {
        return await supabase.auth.signInWithPassword({
          email,
          password,
        });
      } else {
        // Mock sign in for development
        console.log('Mock sign in:', email);
        const mockUser = createMockUser(email);
        
        setUser(mockUser);
        const mockSession = createMockSession(mockUser);
        setSession(mockSession);
        return { error: null, data: { session: mockSession } as any };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (
    email: string, 
    password: string, 
    metadata?: Record<string, any>
  ): Promise<AuthResponse<Session>> => {
    try {
      if (supabase) {
        return await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        });
      } else {
        // Mock sign up for development
        console.log('Mock sign up:', email, metadata);
        return { error: null, data: { user: { email }, session: null } };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Sign out
   */
  const signOut = async (): Promise<void> => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      // Always clear local state
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async (email: string): Promise<AuthResponse> => {
    try {
      if (supabase) {
        return await supabase.auth.resetPasswordForEmail(email);
      } else {
        // Mock password reset for development
        console.log('Mock password reset for:', email);
        return { error: null, data: {} };
      }
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Update password
   */
  const updatePassword = async (password: string): Promise<AuthResponse> => {
    try {
      if (supabase) {
        return await supabase.auth.updateUser({ password });
      } else {
        // Mock password update for development
        console.log('Mock password update');
        return { error: null, data: {} };
      }
    } catch (error) {
      console.error('Update password error:', error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Sign in with provider
   */
  const signInWithProvider = async (provider: 'google' | 'facebook'): Promise<void> => {
    try {
      if (supabase) {
        await supabase.auth.signInWithOAuth({
          provider,
        });
      } else {
        // Mock provider sign in for development
        console.log(`Mock sign in with ${provider}`);
        const mockUser = {
          id: `mock-${provider}-user-id`,
          email: `mock-${provider}@example.com`,
          user_metadata: {
            full_name: `Mock ${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          },
        } as User;
        
        setUser(mockUser);
        setSession(createMockSession(mockUser));
      }
    } catch (error) {
      console.error(`Sign in with ${provider} error:`, error);
    }
  };

  return {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    signInWithProvider,
  };
};
