import React from "react";
import { Dumbbell } from "lucide-react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <a href="/" className="flex items-center mr-6 space-x-2">
        <Dumbbell className="w-6 h-6" />
        <span className="hidden font-bold sm:inline-block">
          Workout Tracker
        </span>
      </a>
    </div>
  );
};

export default LoadingScreen;
