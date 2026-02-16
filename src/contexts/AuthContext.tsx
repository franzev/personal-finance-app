'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Guard against duplicate init in React Strict Mode (advanced-init-once rule)
let didInit = false;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const queryClient = useQueryClient();
  const previousUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      const getUser = async () => {
        const {
          data: { user: supabaseUser },
        } = await supabase.auth.getUser();
        if (supabaseUser) {
          setUser(mapUser(supabaseUser));
          previousUserIdRef.current = supabaseUser.id;
        }
        setIsLoading(false);
      };

      getUser();
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // Clear cache if user changed (different user logged in)
        if (previousUserIdRef.current && previousUserIdRef.current !== session.user.id) {
          queryClient.clear();
        }
        previousUserIdRef.current = session.user.id;
        setUser(mapUser(session.user));
      } else {
        queryClient.clear();
        previousUserIdRef.current = null;
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, queryClient]);

  const mapUser = (supabaseUser: User): AuthUser => ({
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
    email: supabaseUser.email || '',
  });

  const signOut = async () => {
    queryClient.clear();
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
