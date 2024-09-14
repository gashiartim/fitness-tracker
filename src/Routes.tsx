import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import WorkoutDetails from "./pages/WorkoutDetails";
import WorkoutHistory from "./pages/WorkoutHistory";
import NotFound from "./pages/NotFound";
import { Session } from "@supabase/supabase-js";
import LoadingScreen from "./components/LoadingScreen";

function AppRoutes() {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={session ? <Navigate to="/" replace /> : <Login />}
      />

      <Route element={<ProtectedRoute session={session} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/workouts/history" element={<WorkoutHistory />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function ProtectedRoute({ session }: { session: Session | null }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default AppRoutes;
