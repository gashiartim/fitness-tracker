"use client";

import React, { useState } from "react";

import { ChevronRight, Dumbbell, Plus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWorkouts, useCreateWorkout } from "../api/queries";
import { useAuth } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../api/keys";
import { Workout } from "../api/types";

export default function WorkoutsPage() {
  const [isNewWorkoutDialogOpen, setIsNewWorkoutDialogOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: workouts,
    isLoading,
    error,
  } = useWorkouts(user?.id ?? "", {
    enabled: !!user?.id,
  });

  const createWorkoutMutation = useCreateWorkout({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.workouts(user?.id ?? ""),
      });
      setIsNewWorkoutDialogOpen(false);
    },
  });

  const handleCreateWorkout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newWorkout = {
      user_id: user?.id ?? "",
      name: formData.get("workout-name") as string,
      date: formData.get("workout-date") as string,
      notes: formData.get("workout-notes") as string,
      duration: 0, // You might want to add a duration field to the form
    };
    createWorkoutMutation.mutate(newWorkout);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">Workouts</h1>

      {/* Apply dark mode classes to your components */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts?.map((workout: Workout) => (
          <Card key={workout.id} className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">{workout.name}</CardTitle>
              <CardDescription>
                {new Date(workout.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{workout.duration} min</Badge>
                {/* We don't have exercise count in our current data model */}
                {/* <span className="text-sm text-muted-foreground">{workout.exercises} exercises</span> */}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <a href={`/workouts/${workout.id}`}>
                  View Details
                  <ChevronRight className="w-4 h-4 ml-2" />
                </a>
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
          <Button variant="outline" className="justify-start h-auto py-4">
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Template
          </Button>
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
          {workouts?.map((workout: Workout) => (
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
              <Badge>{workout.duration} min</Badge>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={isNewWorkoutDialogOpen}
        onOpenChange={setIsNewWorkoutDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New Workout</DialogTitle>
            <DialogDescription>
              Create a new workout session. You can add exercises and track your
              progress.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateWorkout} className="space-y-4">
            <div>
              <Label htmlFor="workout-name">Workout Name</Label>
              <Input
                id="workout-name"
                name="workout-name"
                placeholder="e.g., Full Body Workout"
              />
            </div>
            <div>
              <Label htmlFor="workout-date">Date</Label>
              <Input
                id="workout-date"
                name="workout-date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label htmlFor="workout-notes">Notes</Label>
              <Textarea
                id="workout-notes"
                name="workout-notes"
                placeholder="Any additional notes for this workout..."
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewWorkoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Start Workout</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
