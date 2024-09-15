import { getWorkoutHistory } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type WorkoutStreaksProps = {
  className?: string;
};

export const WorkoutStreaks: FC<WorkoutStreaksProps> = () => {
  const { data: workoutHistory, isLoading } = useQuery({
    queryKey: ["workoutHistory"],
    queryFn: getWorkoutHistory,
  });

  if (isLoading) return <div>Loading...</div>;

  // Calculate the number of consecutive weeks the user has worked out on the same day of the week
  const streaks = workoutHistory?.reduce((acc, workout) => {
    const workoutDate = new Date(workout.created_at);
    const workoutDayOfWeek = workoutDate.getDay();

    const today = new Date();
    const todayDayOfWeek = today.getDay();

    if (workoutDayOfWeek === todayDayOfWeek) {
      acc++;
    }
    return acc;
  }, 0);

  console.log({ workoutHistory });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Streak</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-2 text-4xl font-bold">
          {streaks} {streaks === 1 ? "Day" : "Days"}
        </div>
        <p className="text-muted-foreground">Keep it up!</p>
      </CardContent>
    </Card>
  );
};
