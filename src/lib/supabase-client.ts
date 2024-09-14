"use client";
import { createClient } from "@supabase/supabase-js";

import { supabaseConfig } from "./supabase-config";

export const supabase = createClient(
  supabaseConfig.supabaseUrl,
  supabaseConfig.supabaseAnonKey
);

// Function to sign up new users
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};
