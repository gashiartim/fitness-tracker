import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const QuickStartCard: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardContent className="p-6">
        <Button size="lg" className="w-full sm:w-auto">
          <Play className="h-4 w-4 mr-2" />
          Quick Start Workout
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickStartCard;
