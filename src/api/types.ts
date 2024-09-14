// User Profiles
export type UserProfile = {
  id: string;
  user_id: string | null;
  username: string;
  height: number | null;
  date_of_birth: string | null;
  workout_reminders: boolean;
  goal_updates: boolean;
  new_features: boolean;
  weight_unit: "kg" | "lbs";
  distance_unit: "km" | "mi";
  created_at: string | null;
  updated_at: string | null;
};

// Exercises
export type Exercise = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  is_custom: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

// Workouts
export type Workout = {
  id: string;
  user_id: string | null;
  name: string;
  date: string;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

// Workout Exercises
export type WorkoutExercise = {
  id: string;
  workout_id: string | null;
  exercise_id: string | null;
  order_num: number;
  created_at: string | null;
  updated_at: string | null;
};

// Sets
export type Set = {
  id: string;
  workout_exercise_id: string | null;
  weight: number | null;
  reps: number | null;
  rpe: number | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

// Body Measurements
export type BodyMeasurement = {
  id: string;
  user_id: string | null;
  date: string;
  weight: number | null;
  body_fat_percentage: number | null;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  thighs: number | null;
  biceps: number | null;
  created_at: string | null;
  updated_at: string | null;
};

// Goals
export type Goal = {
  id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  target_date: string | null;
  achieved: boolean | null;
  achieved_date: string | null;
  created_at: string | null;
  updated_at: string | null;
};
