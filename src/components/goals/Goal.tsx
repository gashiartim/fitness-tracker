import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { Edit, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGoal } from "@/api/mutations";

type GoalProps = {
  id: string;
  name: string;
  targetDate: string;
  currentValue: number;
  targetValue: number;
  completed: boolean;
  onEditGoal: () => void;
};

export const Goal: FC<GoalProps> = ({
  id,
  name,
  targetDate,
  completed,
  onEditGoal,
}) => {
  const queryClient = useQueryClient();

  const deleteGoalMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          Target to be achieved by {new Date(targetDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Progress value={(currentValue / targetValue) * 100} className="mb-4" /> */}
        <div className="flex items-center justify-end">
          {/* <Input
            type="number"
            value={currentValue}
            onChange={(e) => updateGoalProgress(parseFloat(e.target.value))}
            className="w-24 mr-4"
          /> */}
          <div>
            <Button
              variant="outline"
              size="icon"
              className="mr-2"
              onClick={onEditGoal}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteGoalMutation.mutate(id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {completed && (
          <p className="mt-2 text-sm text-green-500">Goal completed!</p>
        )}
      </CardContent>
    </Card>
  );
};
