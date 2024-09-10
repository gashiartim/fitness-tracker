import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Dumbbell,
  ClipboardList,
  TrendingUp,
  Settings,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { value: "home", label: "Home", icon: Home, path: "/" },
    { value: "workouts", label: "Workouts", icon: Dumbbell, path: "/workouts" },
    {
      value: "exercises",
      label: "Exercises",
      icon: ClipboardList,
      path: "/exercises",
    },
    {
      value: "progress",
      label: "Progress",
      icon: TrendingUp,
      path: "/progress",
    },
    { value: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <nav className="mb-8">
      <ToggleGroup
        type="single"
        variant="outline"
        value={location.pathname}
        className="justify-center"
      >
        {navItems.map(({ value, label, icon: Icon, path }) => (
          <ToggleGroupItem key={value} value={path} asChild>
            <Link to={path} aria-label={label}>
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Link>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </nav>
  );
};

export default Navigation;
