import React from "react";
import { WorkoutLoggerForm } from "../components/workout-logger/WorkoutLoggerForm";
import WorkoutHistory from "../components/workout-logger/WorkoutHistory";

const WorkoutLogger: React.FC = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Log Workout</h1>
      <WorkoutLoggerForm />
      <WorkoutHistory />
    </div>
  );
};

export default WorkoutLogger;
