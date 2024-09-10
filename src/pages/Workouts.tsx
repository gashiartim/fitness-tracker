"use client";

import { Play, Calendar, ChevronRight, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data for recent workouts
const recentWorkouts = [
  {
    id: 1,
    name: "Full Body Workout",
    date: "2023-06-15",
    duration: "45 min",
    exercises: 8,
  },
  {
    id: 2,
    name: "Upper Body Focus",
    date: "2023-06-13",
    duration: "30 min",
    exercises: 6,
  },
  {
    id: 3,
    name: "Leg Day",
    date: "2023-06-11",
    duration: "50 min",
    exercises: 7,
  },
  {
    id: 4,
    name: "Cardio Blast",
    date: "2023-06-09",
    duration: "20 min",
    exercises: 4,
  },
];

export default function WorkoutsPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Workouts</h1>
        <div className="space-x-2">
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="default">
            <Play className="w-4 h-4 mr-2" />
            Start New Workout
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentWorkouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader>
              <CardTitle>{workout.name}</CardTitle>
              <CardDescription>
                {new Date(workout.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{workout.duration}</Badge>
                <span className="text-sm text-muted-foreground">
                  {workout.exercises} exercises
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View Details
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">Workout Templates</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Full Body",
            "Upper Body",
            "Lower Body",
            "Push",
            "Pull",
            "Legs",
          ].map((template) => (
            <Button
              key={template}
              variant="outline"
              className="justify-start h-auto py-4"
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              {template}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Workout History</h2>
          <a href="/workouts/history" className="text-primary hover:underline">
            View All
          </a>
        </div>
        <div className="space-y-4">
          {recentWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted"
            >
              <div className="flex items-center">
                <Avatar className="w-10 h-10 mr-4">
                  <AvatarImage
                    src={`/placeholder.svg?text=${workout.name[0]}`}
                    alt={workout.name}
                  />
                  <AvatarFallback>{workout.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{workout.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(workout.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Badge>{workout.duration}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
