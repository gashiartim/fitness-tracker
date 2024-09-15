import {
  AddGoalForm,
  GoalFormData,
  goalSchema,
} from "@/components/goals/AddGoalForm";
import { Goal } from "@/components/goals/Goal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchGoals } from "@/api/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

export default function Goals() {
  const {
    data: goals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  const form = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: "",
      description: "",
      targetValue: 0,
      targetDate: "",
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Fitness Goals</h1>
      <Form {...form}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Set New Goal</CardTitle>
            <CardDescription>
              Define a new fitness goal to track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddGoalForm form={form} />
          </CardContent>
        </Card>

        {goals?.map((goal) => (
          <Goal
            key={goal.id}
            id={goal.id}
            name={goal.name}
            targetDate={goal.target_date}
            currentValue={goal.currentValue}
            targetValue={goal.targetValue}
            completed={goal.achieved}
            onEditGoal={() => {
              form.setValue("id", goal.id);
              form.setValue("editing", true);
              form.setValue("name", goal.name);
              form.setValue("description", goal.description);
              form.setValue("targetValue", goal.targetValue);
              form.setValue("targetDate", goal.target_date);
            }}
          />
        ))}
      </Form>
    </div>
  );
}
