import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

type Role = "user" | "seller" | "admin" | "moderator";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: Role[];
  isSeller: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, asSeller?: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithPhone: (phone: string) => Promise<void>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<void>;
  becomeSeller: (storeName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUserData = async (uid: string) => {
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid),
    ]);
    setProfile(p as any);
    setRoles((r ?? []).map((x: any) => x.role));
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) setTimeout(() => loadUserData(s.user.id), 0);
      else { setProfile(null); setRoles([]); }
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) loadUserData(session.user.id);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, asSeller = false) => {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
    if (asSeller && data.user) {
      // role insert; profile auto-created by trigger
      await supabase.from("user_roles").insert({ user_id: data.user.id, role: "seller" as any });
      await supabase.from("seller_profiles").insert({
        user_id: data.user.id,
        store_name: fullName + "'s Store",
        slug: slugify(fullName + "-" + data.user.id.slice(0, 6)),
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) throw r.error;
  };

  const signInWithApple = async () => {
    const r = await lovable.auth.signInWithOAuth("apple", { redirect_uri: window.location.origin });
    if (r.error) throw r.error;
  };

  const signInWithPhone = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
  };

  const verifyPhoneOtp = async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
    if (error) throw error;
  };

  const becomeSeller = async (storeName: string) => {
    if (!user) throw new Error("Not signed in");
    await supabase.from("user_roles").insert({ user_id: user.id, role: "seller" as any });
    await supabase.from("seller_profiles").insert({
      user_id: user.id,
      store_name: storeName,
      slug: slugify(storeName + "-" + user.id.slice(0, 6)),
    });
    await loadUserData(user.id);
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  const refreshRoles = async () => { if (user) await loadUserData(user.id); };

  const isSeller = roles.includes("seller");

  return (
    <AuthContext.Provider value={{ user, session, profile, roles, isSeller, loading, signUp, signIn, signInWithGoogle, signInWithApple, signInWithPhone, verifyPhoneOtp, becomeSeller, signOut, refreshRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
