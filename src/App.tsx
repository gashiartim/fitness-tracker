import { Route, Routes } from "react-router";
import Dashboard from "@/pages/Dashboard";
import Workouts from "@/pages/Workouts";
import Exercises from "@/pages/Exercises";
import Progress from "@/pages/Progress";
import Settings from "@/pages/Settings";
import WorkoutLogger from "@/pages/WorkoutLogger";
import ExerciseLibrary from "@/pages/Exercises";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/workout-logger" element={<WorkoutLogger />} />
        <Route path="/exercise-library" element={<ExerciseLibrary />} />
      </Routes>
    </Layout>
  );
}

export default App;
