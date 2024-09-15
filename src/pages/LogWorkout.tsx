"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function LogWorkout() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Date.now(),
        name: "",
        sets: 0,
        reps: 0,
        weight: 0,
        rpe: 0,
        notes: "",
      },
    ]);
  };

  const updateExercise = (
    id: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const finishWorkout = () => {
    // TODO: Implement workout saving logic
    console.log("Workout finished", exercises);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Log Workout</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rest Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold">
              {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </div>
            <div>
              <Button onClick={toggleTimer} className="mr-2">
                {isTimerRunning ? "Pause" : "Start"}
              </Button>
              <Button onClick={resetTimer} variant="outline">
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {exercises.map((exercise, index) => (
        <Card key={exercise.id} className="mb-6">
          <CardHeader>
            <CardTitle>Exercise {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Input
                placeholder="Exercise name"
                value={exercise.name}
                onChange={(e) =>
                  updateExercise(exercise.id, "name", e.target.value)
                }
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="number"
                  placeholder="Sets"
                  value={exercise.sets}
                  onChange={(e) =>
                    updateExercise(
                      exercise.id,
                      "sets",
                      parseInt(e.target.value)
                    )
                  }
                />
                <Input
                  type="number"
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) =>
                    updateExercise(
                      exercise.id,
                      "reps",
                      parseInt(e.target.value)
                    )
                  }
                />
                <Input
                  type="number"
                  placeholder="Weight"
                  value={exercise.weight}
                  onChange={(e) =>
                    updateExercise(
                      exercise.id,
                      "weight",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </div>
              <Select
                value={exercise.rpe.toString()}
                onValueChange={(value) =>
                  updateExercise(exercise.id, "rpe", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="RPE" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rpe) => (
                    <SelectItem key={rpe} value={rpe.toString()}>
                      {rpe}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Notes"
                value={exercise.notes}
                onChange={(e) =>
                  updateExercise(exercise.id, "notes", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addExercise} className="mb-6">
        Add Exercise
      </Button>

      <Button onClick={finishWorkout} className="w-full">
        Finish Workout
      </Button>
    </div>
  );
}
