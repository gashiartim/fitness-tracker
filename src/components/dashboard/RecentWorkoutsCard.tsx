import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentWorkoutsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Workouts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Full Body Workout</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              2 days ago
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span>Upper Body Focus</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              4 days ago
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span>Leg Day</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              1 week ago
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentWorkoutsCard;
