import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const FitnessGoalsCard: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Current Fitness Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Increase Bench Press</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Lose Body Fat</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Run 5K</span>
              <span>40%</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FitnessGoalsCard;
