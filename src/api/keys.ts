export const queryKeys = {
  userProfile: (userId: string) => ["userProfile", userId] as const,
  workouts: (userId: string) => ["workouts", userId] as const,
  workoutExercises: (workoutId: string) =>
    ["workoutExercises", workoutId] as const,
  sets: (workoutExerciseId: string) => ["sets", workoutExerciseId] as const,
  exercises: () => ["exercises"] as const,
  workoutDetails: (workoutId: string) => ["workoutDetails", workoutId] as const,
};

export const progressKeys = {
  all: ["progress"] as const,
  lists: () => [...progressKeys.all, "list"] as const,
  list: (filters: string) => [...progressKeys.lists(), { filters }] as const,
  details: () => [...progressKeys.all, "detail"] as const,
  detail: (id: number) => [...progressKeys.details(), id] as const,
};
