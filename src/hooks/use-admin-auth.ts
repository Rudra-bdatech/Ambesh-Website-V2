import { useState, useEffect } from "react";
import { supabase, adminLogin, adminLogout } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await adminLogin(email, password);
    return { data, error };
  };

  const logout = async () => {
    await adminLogout();
    setSession(null);
  };

  return {
    session,
    loading,
    isAuthenticated: !!session,
    login,
    logout,
  };
}
