import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal, updateGoal } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const goalSchema = z.object({
  name: z.string().min(1, "Goal name is required"),
  description: z.string().optional(),
  targetValue: z.number().positive("Target value must be positive"),
  targetDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  id: z.string().optional(),
  editing: z.boolean().optional(),
});

export type GoalFormData = z.infer<typeof goalSchema>;

type AddGoalFormProps = {
  form: UseFormReturn<GoalFormData>;
};

export const AddGoalForm: FC<AddGoalFormProps> = ({ form }) => {
  const queryClient = useQueryClient();

  const createGoalMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      form.reset();
    },
  });

  const updateGoalMutation = useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  const isEditing = form.watch("editing");

  const onSubmit = (data: GoalFormData) => {
    if (data.editing && data.id) {
      updateGoalMutation.mutate({
        id: data.id,
        name: data.name!,
        targetValue: data.targetValue,
        targetDate: data.targetDate,
        description: data.description ?? "",
      });
    } else {
      createGoalMutation.mutate({
        name: data.name,
        targetValue: data.targetValue,
        targetDate: data.targetDate,
        description: data.description ?? "",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter goal name" {...field} />
              </FormControl>
              <FormDescription>
                Give your goal a clear and concise name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your goal (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter target value"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Set a numeric target for your goal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Set a target date for achieving your goal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            createGoalMutation.isPending || updateGoalMutation.isPending
          }
        >
          {isEditing
            ? updateGoalMutation.isPending
              ? "Updating Goal..."
              : "Update Goal"
            : createGoalMutation.isPending
            ? "Adding Goal..."
            : "Add Goal"}
        </Button>
      </form>
    </Form>
  );
};
