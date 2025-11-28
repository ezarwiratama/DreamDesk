import 'react-native-url-polyfill/auto'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan ANON KEY dari Dashboard Supabase Anda
const supabaseUrl = 'https://hqxdwolvhoptkgdgkwbg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeGR3b2x2aG9wdGtnZGdrd2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDQzMTUsImV4cCI6MjA3OTU4MDMxNX0.8uMWiv6GxuONnrOTJcGb3t3TovX9E_mnIAMhpD2PghE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});