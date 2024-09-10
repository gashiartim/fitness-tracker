import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const WeeklySummaryCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Workout Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="flex items-center">
              <span className="w-8">{day}</span>
              <Progress value={Math.random() * 100} className="h-2 flex-grow" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklySummaryCard;
