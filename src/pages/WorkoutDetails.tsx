"use client";

import { useWorkoutDetails } from "@/api/queries";

import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Clipboard,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";

export default function WorkoutDetails() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError, error } = useWorkoutDetails(id, {
    enabled: !!id,
  });

  if (isLoading) return <WorkoutDetailsSkeleton />;
  if (isError || !data)
    return (
      <div className="text-center text-red-500">Error: {error?.message}</div>
    );

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">{data.name}</CardTitle>
            <div className="space-x-2">
              <Button variant="outline" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="flex items-center space-x-4 text-sm">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {format(new Date(data.date), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {format(new Date(data.created_at), "h:mm a")}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.notes && (
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold">Notes</h3>
              <p className="text-gray-600 dark:text-gray-300">{data.notes}</p>
            </div>
          )}
          <h3 className="mb-4 text-xl font-semibold">Exercises</h3>
          <Accordion type="single" collapsible className="w-full">
            {data.workout_exercises.map((workoutExercise, index) => (
              <AccordionItem
                value={workoutExercise.id}
                key={workoutExercise.id}
              >
                <AccordionTrigger>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span>{workoutExercise.exercise.name}</span>
                    <Badge>{workoutExercise.sets.length} sets</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {workoutExercise.sets.map((set, setIndex) => (
                      <div
                        key={set.id}
                        className="flex items-center justify-between p-2 rounded bg-muted"
                      >
                        <span className="font-medium">Set {setIndex + 1}</span>
                        <div className="flex space-x-4">
                          <span>{set.weight} kg</span>
                          <span>{set.reps} reps</span>
                          <span>RPE {set.rpe}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Clipboard className="w-4 h-4 mr-2" />
            Clone Workout
          </Button>
          <Button>
            Start Similar Workout
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function WorkoutDetailsSkeleton() {
  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <Card>
        <CardHeader>
          <Skeleton className="w-3/4 h-8 mb-2" />
          <Skeleton className="w-1/2 h-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-20 mb-6" />
          <Skeleton className="w-1/4 h-6 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-1/3 h-10" />
        </CardFooter>
      </Card>
    </div>
  );
}
