import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { supabase } from "../lib/supabase-client";
import { queryKeys } from "./keys";
import { UserProfile, Workout, WorkoutExercise, Set, Exercise } from "./types";

// Fetch user profile
export const useUserProfile = (
  userId: string,
  options?: UseQueryOptions<UserProfile, Error, UserProfile>
) => {
  return useQuery({
    queryKey: queryKeys.userProfile(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data;
    },
    ...options,
  });
};

// Fetch user's workouts
export const useWorkouts = (
  userId: string,
  options?: Partial<UseQueryOptions<Workout[], Error, Workout[]>>
) => {
  return useQuery({
    queryKey: queryKeys.workouts(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });

      if (error) throw error;
      return data;
    },
    ...options,
  });
};

// Fetch exercises for a specific workout
export const useWorkoutExercises = (
  workoutId: string,
  options?: UseQueryOptions<WorkoutExercise[], Error, WorkoutExercise[]>
) => {
  return useQuery({
    queryKey: queryKeys.workoutExercises(workoutId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_exercises")
        .select(
          `
          *,
          exercises(*)
        `
        )
        .eq("workout_id", workoutId)
        .order("order_num");

      if (error) throw error;
      return data;
    },
    ...options,
  });
};

// Fetch sets for a specific workout exercise
export const useSets = (
  workoutExerciseId: string,
  options?: UseQueryOptions<Set[], Error, Set[]>
) => {
  return useQuery({
    queryKey: queryKeys.sets(workoutExerciseId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sets")
        .select("*")
        .eq("workout_exercise_id", workoutExerciseId)
        .order("created_at");

      if (error) throw error;
      return data;
    },
    ...options,
  });
};

// Fetch all exercises
export const useExercises = (
  options?: Partial<UseQueryOptions<Exercise[], Error, Exercise[]>>
) => {
  return useQuery({
    queryKey: queryKeys.exercises(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
    ...options,
  });
};

// Create a new workout
export const useCreateWorkout = (
  options?: UseMutationOptions<
    Workout,
    Error,
    Omit<Workout, "id" | "created_at" | "updated_at">
  >
) => {
  return useMutation({
    mutationFn: async (newWorkout) => {
      const { data, error } = await supabase
        .from("workouts")
        .insert(newWorkout)
        .single();

      if (error) throw error;
      return data;
    },
    ...options,
  });
};

// Update a workout
export const useUpdateWorkout = (
  options?: UseMutationOptions<Workout, Error, Workout>
) => {
  return useMutation({
    mutationFn: async (updatedWorkout) => {
      const { data, error } = await supabase
        .from("workouts")
        .update(updatedWorkout)
        .eq("id", updatedWorkout.id)
        .single();

      if (error) throw error;
      return data;
    },
    ...options,
  });
};

// Delete a workout
export const useDeleteWorkout = (
  options?: UseMutationOptions<void, Error, string>
) => {
  return useMutation({
    mutationFn: async (workoutId) => {
      const { error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", workoutId);

      if (error) throw error;
    },
    ...options,
  });
};

// Fetch all goals for the current user
export const fetchGoals = async () => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// export async function fetchUserProgress(): Promise<ProgressData[]> {
//   const { data, error } = await supabase
//     .from("progress")
//     .select("*")
//     .order("date", { ascending: false });

//   if (error) throw error;
//   return data;
// }

// export async function updateUserProgress(
//   progressData: ProgressData
// ): Promise<void> {
//   const { error } = await supabase.from("progress").insert(progressData);

//   if (error) throw error;
// }

export const fetchExercises = async () => {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const getWorkoutHistory = async () => {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
