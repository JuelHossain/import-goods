import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient<Database>> | null = null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

try {
  if (isSupabaseConfigured()) {
    supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);
    console.log('Supabase client initialized successfully');
  } else {
    console.warn('Supabase client initialization failed, using mock auth');
    // For static site generation, create a mock or leave as null
    supabase = null;
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabase = null;
}

export { supabase };
