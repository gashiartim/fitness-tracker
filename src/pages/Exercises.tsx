import React from "react";
import { Search, Plus, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const exercises = [
  { id: 1, name: "Bench Press", category: "Chest", equipment: "Barbell" },
  { id: 2, name: "Squat", category: "Legs", equipment: "Barbell" },
  { id: 3, name: "Deadlift", category: "Back", equipment: "Barbell" },
  { id: 4, name: "Pull-up", category: "Back", equipment: "Bodyweight" },
  { id: 5, name: "Push-up", category: "Chest", equipment: "Bodyweight" },
  { id: 6, name: "Dumbbell Row", category: "Back", equipment: "Dumbbell" },
];

export default function ExerciseLibrary() {
  const [view, setView] = React.useState("grid");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Exercise Library</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Exercise
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Search exercises..." />
        </div>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) => value && setView(value)}
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div
        className={`grid gap-6 ${
          view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {exercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle>{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Category:</strong> {exercise.category}
              </p>
              <p>
                <strong>Equipment:</strong> {exercise.equipment}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
