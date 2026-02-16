import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase environment variables are not set. ' +
        'Callers should check isSupabaseConfigured() before calling createClient().',
    );
  }

  return createBrowserClient(url, key);
}
