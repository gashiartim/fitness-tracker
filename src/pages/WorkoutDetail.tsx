"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rpe: number;
  notes: string;
};

type Workout = {
  id: number;
  date: string;
  exercises: Exercise[];
  notes: string;
};

export default function WorkoutDetail() {
  // Mock data - replace with actual data fetching logic
  const [workout, setWorkout] = useState<Workout>({
    id: 1,
    date: "2024-03-15",
    exercises: [
      {
        id: 1,
        name: "Bench Press",
        sets: 3,
        reps: 10,
        weight: 100,
        rpe: 8,
        notes: "Felt strong today",
      },
      {
        id: 2,
        name: "Squats",
        sets: 4,
        reps: 8,
        weight: 150,
        rpe: 9,
        notes: "Increased weight by 5kg",
      },
    ],
    notes: "Great workout overall. Feeling motivated!",
  });

  const editWorkout = () => {
    // TODO: Implement edit functionality
    console.log("Edit workout");
  };

  const deleteWorkout = () => {
    // TODO: Implement delete functionality
    console.log("Delete workout");
  };

  const cloneWorkout = () => {
    // TODO: Implement clone functionality
    console.log("Clone workout");
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Workout Details</h1>
        <div>
          <Button onClick={editWorkout} className="mr-2">
            Edit
          </Button>
          <Button
            onClick={deleteWorkout}
            variant="destructive"
            className="mr-2"
          >
            Delete
          </Button>
          <Button onClick={cloneWorkout}>Clone</Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Workout Summary</CardTitle>
          <CardDescription>Date: {workout.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={workout.notes}
            onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
            placeholder="Workout notes"
            className="mb-4"
          />
        </CardContent>
      </Card>

      {workout.exercises.map((exercise) => (
        <Card key={exercise.id} className="mb-6">
          <CardHeader>
            <CardTitle>{exercise.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>Sets: {exercise.sets}</div>
              <div>Reps: {exercise.reps}</div>
              <div>Weight: {exercise.weight} kg</div>
              <div>RPE: {exercise.rpe}</div>
            </div>
            <Textarea
              value={exercise.notes}
              readOnly
              placeholder="Exercise notes"
              className="mt-4"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
