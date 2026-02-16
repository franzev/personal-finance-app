import { createClient } from '@/lib/supabase/client';

/**
 * Deduplicate concurrent getUser() calls across parallel queries (async-parallel rule).
 * Multiple queries fire simultaneously via TanStack Query — this ensures only one
 * auth round-trip is made and the result is shared.
 */
let cachedUserPromise: ReturnType<
  ReturnType<typeof createClient>['auth']['getUser']
> | null = null;

export function getUser(supabase: ReturnType<typeof createClient>) {
  if (!cachedUserPromise) {
    cachedUserPromise = supabase.auth.getUser().finally(() => {
      cachedUserPromise = null;
    });
  }
  return cachedUserPromise;
}
