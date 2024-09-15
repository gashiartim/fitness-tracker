"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type TemplateExercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};

type WorkoutTemplate = {
  id: number;
  name: string;
  description: string;
  exercises: TemplateExercise[];
};

export default function WorkoutTemplates() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [newTemplate, setNewTemplate] = useState<Omit<WorkoutTemplate, "id">>({
    name: "",
    description: "",
    exercises: [],
  });

  const addExerciseToTemplate = () => {
    setNewTemplate({
      ...newTemplate,
      exercises: [
        ...newTemplate.exercises,
        { id: Date.now(), name: "", sets: 0, reps: 0 },
      ],
    });
  };

  const updateTemplateExercise = (
    id: number,
    field: keyof TemplateExercise,
    value: string | number
  ) => {
    setNewTemplate({
      ...newTemplate,
      exercises: newTemplate.exercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      ),
    });
  };

  const saveTemplate = () => {
    setTemplates([...templates, { ...newTemplate, id: Date.now() }]);
    setNewTemplate({ name: "", description: "", exercises: [] });
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Workout Templates</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              placeholder="Template name"
              value={newTemplate.name}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
            />
            <Textarea
              placeholder="Template description"
              value={newTemplate.description}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, description: e.target.value })
              }
            />
            {newTemplate.exercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <Input
                      placeholder="Exercise name"
                      value={exercise.name}
                      onChange={(e) =>
                        updateTemplateExercise(
                          exercise.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Sets"
                        value={exercise.sets}
                        onChange={(e) =>
                          updateTemplateExercise(
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
                          updateTemplateExercise(
                            exercise.id,
                            "reps",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button onClick={addExerciseToTemplate} className="mb-6">
            Add Exercise
          </Button>
          <Button onClick={saveTemplate} className="w-full">
            Save Template
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
