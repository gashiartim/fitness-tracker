import React from "react";
import ThemeToggle from "@/components/shared/ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Workout Tracker</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
