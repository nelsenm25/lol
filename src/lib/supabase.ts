import { createClient } from '@supabase/supabase-js';

// These values should be replaced with your actual Supabase project credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase credentials are missing. Please check your .env file.');
}

if (SUPABASE_URL === 'https://your-project.supabase.co') {
  console.error('Please replace the placeholder Supabase URL with your actual project URL.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
