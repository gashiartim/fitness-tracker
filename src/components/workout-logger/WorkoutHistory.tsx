import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutHistory } from "../../api/queries";

const WorkoutHistory: React.FC = () => {
  const {
    data: workoutLogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workoutHistory"],
    queryFn: getWorkoutHistory,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching workout history</div>;

  return (
    <div>
      <h2>Workout History</h2>
      {workoutLogs && workoutLogs.length > 0 ? (
        <ul>
          {workoutLogs.map((log) => (
            <li key={log.id}>{JSON.stringify(log)}</li>
          ))}
        </ul>
      ) : (
        <p>No workout logs found.</p>
      )}
    </div>
  );
};

export default WorkoutHistory;
