import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/api/types";

async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export function useUserProfile() {
  const { user } = useAuth();

  return useQuery<UserProfile, Error>({
    queryKey: ["userProfile", user?.id],
    queryFn: () => fetchUserProfile(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
