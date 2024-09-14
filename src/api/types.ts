export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  email: string;
  workoutReminders: boolean;
  goalUpdates: boolean;
  newFeatures: boolean;
  weightUnit: "kg" | "lbs";
  distanceUnit: "km" | "mi";
  // ... any other fields
}

export interface Workout {
  id: string;
  user_id: string;
  date: string;
  name: string;
  duration: number; // in minutes
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutExercise {
  id: string;
  workout_id: string;
  exercise_id: string;
  order_num: number;
  exercise: {
    id: string;
    name: string;
    // Add other exercise fields as needed
  };
  // Add other fields as needed
}

export interface Set {
  id: string;
  workout_exercise_id: string;
  reps: number;
  weight: number;
  // Add other fields as needed
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  category?: string;
  // Add other fields as needed
}

export interface ProgressData {
  id?: number;
  userId?: string;
  weight: number;
  bodyFatPercentage: number;
  date: string;
}
