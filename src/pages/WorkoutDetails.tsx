import { useParams } from "react-router-dom";

export default function WorkoutDetails() {
  const { id } = useParams();

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Workout Details</h1>
      <p>Workout ID: {id}</p>
      {/* Add your workout details content here */}
    </div>
  );
}
