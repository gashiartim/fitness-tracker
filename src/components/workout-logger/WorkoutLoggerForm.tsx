import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Minus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkout } from "@/api/mutations";
import { fetchExercises } from "@/api/queries";
import { toast } from "@/hooks/use-toast";

const exerciseSchema = z.object({
  exerciseId: z.string().uuid(),
  sets: z.array(
    z.object({
      weight: z.number().min(0).max(1000),
      reps: z.number().int().min(1).max(100),
      rpe: z.number().min(1).max(10).optional(),
    })
  ),
  notes: z.string().max(500).optional(),
});

const workoutFormSchema = z.object({
  name: z.string().min(1, "Workout name is required").max(100),
  date: z.string(),
  notes: z.string().max(1000).optional(),
  exercises: z.array(exerciseSchema),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

export const WorkoutLoggerForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      exercises: [
        {
          exerciseId: "",
          sets: [
            {
              weight: 0,
              reps: 0,
              rpe: 0,
            },
          ],
          notes: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "exercises",
    control: form.control,
  });

  const { data: exercises, isLoading: isLoadingExercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });

  const mutation = useMutation({
    mutationFn: createWorkout,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["workoutHistory"],
      });
      toast({
        title: "Workout created successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      console.error("Error submitting workout:", error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: WorkoutFormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Full Body Workout" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h2 className="mb-4 text-lg font-semibold">Exercises</h2>
          {fields.map((field, index) => (
            <Card key={field.id} className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Exercise {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name={`exercises.${index}.exerciseId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an exercise" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingExercises ? (
                            <SelectItem value="default">
                              Loading exercises...
                            </SelectItem>
                          ) : (
                            exercises?.map((exercise) => (
                              <SelectItem key={exercise.id} value={exercise.id}>
                                {exercise.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4">
                  <FormLabel>Sets</FormLabel>
                  {form.watch(`exercises.${index}.sets`).map((_, setIndex) => (
                    <div
                      key={setIndex}
                      className="flex items-center mt-2 space-x-2"
                    >
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.sets.${setIndex}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Weight"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(+e.target.value)
                                }
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.sets.${setIndex}.reps`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Reps"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(+e.target.value)
                                }
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.sets.${setIndex}.rpe`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="RPE"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(+e.target.value)
                                }
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      const currentSets = form.getValues(
                        `exercises.${index}.sets`
                      );
                      form.setValue(`exercises.${index}.sets`, [
                        ...currentSets,
                        { weight: 0, reps: 0 },
                      ]);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Set
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`exercises.${index}.notes`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional notes for this exercise..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Minus className="w-4 h-4 mr-2" /> Remove Exercise
                </Button>
              </CardFooter>
            </Card>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                exerciseId: "",
                sets: [{ weight: 0, reps: 0 }],
                notes: "",
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" /> Add Exercise
          </Button>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional notes for the entire workout..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can add any general notes about the workout here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Save Workout
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
