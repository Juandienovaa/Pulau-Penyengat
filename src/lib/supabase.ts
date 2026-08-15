import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// For client-side usage
export const createBrowserSupabaseClient = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey);

// Legacy fallback (for backward compatibility if used anywhere else)
import { createClient as createLegacyClient } from '@supabase/supabase-js';
export const supabase = createLegacyClient(supabaseUrl, supabaseAnonKey);
