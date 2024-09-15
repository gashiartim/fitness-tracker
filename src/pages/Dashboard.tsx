import { TrendingUp, Dumbbell, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useWorkouts } from "../api/queries";
import { useAuth } from "../hooks/useAuth";
import { Workout } from "../api/types";
import { WorkoutStreaks } from "@/components/workouts/WorkoutStreaks";

const goals = [
  { id: 1, name: "Increase Bench Press", progress: 75 },
  { id: 2, name: "Lose Body Fat", progress: 60 },
  { id: 3, name: "Run 5K", progress: 40 },
];

const bodyMeasurements = [
  { name: "Weight", value: "75 kg", change: "-2 kg" },
  { name: "Body Fat", value: "15%", change: "-1%" },
  { name: "Chest", value: "100 cm", change: "+2 cm" },
  { name: "Waist", value: "80 cm", change: "-3 cm" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    data: workouts,
    isLoading,
    error,
  } = useWorkouts(user?.id ?? "", {
    enabled: !!user?.id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const recentWorkouts = workouts?.slice(0, 3) || [];

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">Dashboard</h1>

      {/* Apply dark mode classes to your components */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentWorkouts.map((workout: Workout) => (
                <li
                  key={workout.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{workout.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(workout.date).toLocaleDateString()}
                    </p>
                  </div>
                  {/* <Badge>{workout.} min</Badge> */}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <a href="/workouts">View All Workouts</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fitness Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {goals.map((goal) => (
                <li key={goal.id}>
                  <div className="flex justify-between mb-1">
                    <span>{goal.name}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <a href="/goals">Manage Goals</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Body Measurements</CardTitle>
            <CardDescription>Last updated: 1 week ago</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {bodyMeasurements.map((measurement) => (
                <li
                  key={measurement.name}
                  className="flex items-center justify-between"
                >
                  <span>{measurement.name}</span>
                  <div>
                    <span className="font-medium">{measurement.value}</span>
                    <span
                      className={`ml-2 text-sm ${
                        measurement.change.startsWith("-")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {measurement.change}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <a href="/measurements">Update Measurements</a>
            </Button>
          </CardFooter>
        </Card>

        <WorkoutStreaks />

        <Card>
          <CardHeader>
            <CardTitle>Next Scheduled Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>Tomorrow at 6:00 PM</span>
            </div>
            <p className="font-medium">Lower Body Focus</p>
            <p className="text-sm text-muted-foreground">
              45 minutes • 6 exercises
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Workout Plan
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20" asChild>
                <a
                  href="/exercises"
                  className="flex flex-col items-center justify-center"
                >
                  <Dumbbell className="w-6 h-6 mb-2" />
                  <span>Exercise Library</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <a
                  href="/progress"
                  className="flex flex-col items-center justify-center"
                >
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span>View Progress</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <a
                  href="/goals"
                  className="flex flex-col items-center justify-center"
                >
                  <Target className="w-6 h-6 mb-2" />
                  <span>Set New Goal</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <a
                  href="/workouts/new"
                  className="flex flex-col items-center justify-center"
                >
                  <Calendar className="w-6 h-6 mb-2" />
                  <span>Schedule Workout</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
