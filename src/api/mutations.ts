import { supabase } from "@/lib/supabase-client";
import {
  UserProfile,
  Workout,
  WorkoutExercise,
  Set,
  Exercise,
  ProgressData,
} from "./types";

// User Profile Mutations
export const updateUserProfile = async (
  userId: string,
  profile: Partial<UserProfile>
) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .update(profile)
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};

// Workout Mutations
export const createWorkout = async (
  workout: Omit<Workout, "id" | "created_at" | "updated_at">
) => {
  const { data, error } = await supabase
    .from("workouts")
    .insert(workout)
    .single();

  if (error) throw error;
  return data;
};

export const updateWorkout = async (id: string, workout: Partial<Workout>) => {
  const { data, error } = await supabase
    .from("workouts")
    .update(workout)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const deleteWorkout = async (id: string) => {
  const { error } = await supabase.from("workouts").delete().eq("id", id);

  if (error) throw error;
};

// Workout Exercise Mutations
export const createWorkoutExercise = async (
  workoutExercise: Omit<WorkoutExercise, "id">
) => {
  const { data, error } = await supabase
    .from("workout_exercises")
    .insert(workoutExercise)
    .single();

  if (error) throw error;
  return data;
};

export const updateWorkoutExercise = async (
  id: string,
  workoutExercise: Partial<WorkoutExercise>
) => {
  const { data, error } = await supabase
    .from("workout_exercises")
    .update(workoutExercise)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const deleteWorkoutExercise = async (id: string) => {
  const { error } = await supabase
    .from("workout_exercises")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// Set Mutations
export const createSet = async (set: Omit<Set, "id">) => {
  const { data, error } = await supabase.from("sets").insert(set).single();

  if (error) throw error;
  return data;
};

export const updateSet = async (id: string, set: Partial<Set>) => {
  const { data, error } = await supabase
    .from("sets")
    .update(set)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const deleteSet = async (id: string) => {
  const { error } = await supabase.from("sets").delete().eq("id", id);

  if (error) throw error;
};

// Exercise Mutations
export const createExercise = async (exercise: Omit<Exercise, "id">) => {
  const { data, error } = await supabase
    .from("exercises")
    .insert(exercise)
    .single();

  if (error) throw error;
  return data;
};

export const updateExercise = async (
  id: string,
  exercise: Partial<Exercise>
) => {
  const { data, error } = await supabase
    .from("exercises")
    .update(exercise)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const deleteExercise = async (id: string) => {
  const { error } = await supabase.from("exercises").delete().eq("id", id);

  if (error) throw error;
};

// Progress Data Mutations
export const createProgressData = async (
  progressData: Omit<ProgressData, "id">
) => {
  const { data, error } = await supabase
    .from("progress")
    .insert(progressData)
    .single();

  if (error) throw error;
  return data;
};

export const updateProgressData = async (
  id: number,
  progressData: Partial<ProgressData>
) => {
  const { data, error } = await supabase
    .from("progress")
    .update(progressData)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const deleteProgressData = async (id: number) => {
  const { error } = await supabase.from("progress").delete().eq("id", id);

  if (error) throw error;
};
