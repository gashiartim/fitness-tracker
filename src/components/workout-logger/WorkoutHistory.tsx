import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutHistory } from "@/api/queries";
import { format } from "date-fns";
import { Dumbbell, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const WorkoutHistory: React.FC = () => {
  const {
    data: workoutLogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workoutHistory"],
    queryFn: getWorkoutHistory,
  });

  if (isLoading) return <WorkoutHistorySkeleton />;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error fetching workout history
      </div>
    );

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">Workout History</h2>
      {workoutLogs && workoutLogs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workoutLogs.map((log) => (
            <Card key={log.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {log.name}
                </CardTitle>
                <Badge variant="secondary">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(log.date), "MMM d, yyyy")}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Dumbbell className="w-4 h-4 mr-1" />
                    {log.workout_exercises.length} exercises
                  </span>
                </div>
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <a href={`/workouts/${log.id}`}>
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-muted-foreground">No workout logs found.</p>
            <p className="mt-2">
              Start logging your workouts to see your history here!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const WorkoutHistorySkeleton: React.FC = () => (
  <div className="mt-12">
    <Skeleton className="w-48 h-8 mb-4" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-4 mt-2" />
            <Skeleton className="w-full h-8 mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default WorkoutHistory;
