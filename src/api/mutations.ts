import { supabase } from "@/lib/supabase-client";
import {
  UserProfile,
  Workout,
  WorkoutExercise,
  Set,
  Exercise,
  WorkoutFormValues,
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

export const createWorkout = async (workout: WorkoutFormValues) => {
  const { data, error } = await supabase
    .from("workouts")
    .insert({
      name: workout.name,
      date: workout.date,
      notes: workout.notes,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    .select()
    .single();

  if (error) throw error;

  const workoutId = data.id;

  const exercisePromises = workout.exercises.map(async (exercise, index) => {
    const { data: exerciseData, error: exerciseError } = await supabase
      .from("workout_exercises")
      .insert({
        workout_id: workoutId,
        exercise_id: exercise.exerciseId,
        order_num: index + 1,
      })
      .select()
      .single();

    if (exerciseError) throw exerciseError;

    const exerciseId = exerciseData.id;

    const setPromises = exercise.sets.map(async (set) => {
      const { error: setError } = await supabase.from("sets").insert({
        workout_exercise_id: exerciseId,
        weight: set.weight,
        reps: set.reps,
        rpe: set.rpe,
        notes: "",
      });

      if (setError) throw setError;
    });

    await Promise.all(setPromises);
  });

  await Promise.all(exercisePromises);

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
export const createExercise = async (
  exerciseData: Omit<Exercise, "id" | "created_at" | "updated_at" | "is_custom">
) => {
  const { data, error } = await supabase
    .from("exercises")
    .insert(exerciseData)
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

// // Progress Data Mutations
// export const createProgressData = async (progressData: any) => {
//   const { data, error } = await supabase
//     .from("progress")
//     .insert(progressData)
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const updateProgressData = async (
//   id: number,
//   progressData: Partial<any>
// ) => {
//   const { data, error } = await supabase
//     .from("progress")
//     .update(progressData)
//     .eq("id", id)
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const deleteProgressData = async (id: number) => {
//   const { error } = await supabase.from("progress").delete().eq("id", id);

//   if (error) throw error;
// };

// Create a new goal
export const createGoal = async (goalData: {
  name: string;
  targetValue: number;
  targetDate: string;
  description: string;
}) => {
  const { data, error } = await supabase
    .from("goals")
    .insert([
      {
        user_id: (await supabase.auth.getUser()).data.user?.id,
        name: goalData.name,
        description: goalData.description,
        target_date: goalData.targetDate,
        achieved: false,
        // We don't have a field for target value in the schema, so you might need to add it or store it in the description
      },
    ])
    .single();

  if (error) throw error;
  return data;
};

// Update a goal
export const updateGoal = async ({
  id,
  name,
  targetDate,
  description,
  achieved,
}: {
  id: string;
  currentValue?: number;
  name?: string;
  targetValue?: number;
  targetDate?: string;
  description?: string;
  achieved?: boolean;
}) => {
  const { data, error } = await supabase
    .from("goals")
    .update({
      achieved,
      achieved_date: achieved ? new Date().toISOString() : null,
      name,
      target_date: targetDate,
      description,
    })
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// Delete a goal
export const deleteGoal = async (id: string) => {
  const { data, error } = await supabase.from("goals").delete().eq("id", id);

  if (error) throw error;
  return data;
};
