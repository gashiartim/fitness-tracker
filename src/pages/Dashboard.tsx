import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import QuickStartCard from "@/components/dashboard/QuickStartCard";
import RecentWorkoutsCard from "@/components/dashboard/RecentWorkoutsCard";
import WeeklySummaryCard from "@/components/dashboard/WeeklySummaryCard";
import NextWorkoutCard from "@/components/dashboard/NextWorkoutCard";
import FitnessGoalsCard from "@/components/dashboard/FitnessGoalsCard";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation />

        <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <QuickStartCard />
          <RecentWorkoutsCard />
          <WeeklySummaryCard />
          <NextWorkoutCard />
          <FitnessGoalsCard />
        </main>

        <div className="mt-8">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
