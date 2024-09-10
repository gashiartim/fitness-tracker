import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NextWorkoutCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Scheduled Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">Lower Body Focus</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tomorrow at 6:00 PM
        </p>
        <Button variant="outline" className="mt-4">
          View Workout
        </Button>
      </CardContent>
    </Card>
  );
};

export default NextWorkoutCard;
