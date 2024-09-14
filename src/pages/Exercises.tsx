import React from "react";
import { Search, Plus, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExercise } from "@/api/mutations";
import { useToast } from "@/hooks/use-toast";
import { useExercises } from "@/api/queries";

// const exercises = [
//   { id: 1, name: "Bench Press", category: "Chest", equipment: "Barbell" },
//   { id: 2, name: "Squat", category: "Legs", equipment: "Barbell" },
//   { id: 3, name: "Deadlift", category: "Back", equipment: "Barbell" },
//   { id: 4, name: "Pull-up", category: "Back", equipment: "Bodyweight" },
//   { id: 5, name: "Push-up", category: "Chest", equipment: "Bodyweight" },
//   { id: 6, name: "Dumbbell Row", category: "Back", equipment: "Dumbbell" },
// ];

const exerciseSchema = z.object({
  name: z.string().min(3, "Exercise name must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional().default(""),
  is_custom: z.boolean().default(true),
});

type ExerciseFormData = z.infer<typeof exerciseSchema>;

export default function ExerciseLibrary() {
  const { data: exercises } = useExercises();
  const [view, setView] = React.useState("grid");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      is_custom: true,
    },
  });

  const createExerciseMutation = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast({
        title: "Exercise created",
        description: "Your custom exercise has been added successfully.",
      });
      setIsDialogOpen(false);
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create custom exercise.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ExerciseFormData) => {
    if (data.description && data.description.length > 0) {
      createExerciseMutation.mutate(data);
    } else {
      createExerciseMutation.mutate({ ...data, description: null });
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Exercise Library</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Exercise
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Exercise</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Exercise Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} id="name" />}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => <Input {...field} id="category" />}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Input {...field} id="description" />}
                />
              </div>
              <Button type="submit">Save Exercise</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
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
        {exercises?.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle>{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Category:</strong> {exercise.category}
              </p>
              <p>
                <strong>Equipment:</strong>{" "}
                {exercise.is_custom ? "Custom" : "Library"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
