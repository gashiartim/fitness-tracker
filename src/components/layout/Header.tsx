"use client";

import {
  Home,
  Dumbbell,
  ClipboardList,
  TrendingUp,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const navItems = [
  { value: "home", label: "Home", icon: Home, path: "/" },
  { value: "workouts", label: "Workouts", icon: Dumbbell, path: "/workouts" },
  {
    value: "exercises",
    label: "Exercises",
    icon: ClipboardList,
    path: "/exercises",
  },
  { value: "progress", label: "Progress", icon: TrendingUp, path: "/progress" },
  { value: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export function Header() {
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="container flex items-center h-14">
          <Link to="/" className="flex items-center mr-6 space-x-2">
            <Dumbbell className="w-6 h-6" />
            <span className="hidden font-bold sm:inline-block">
              Workout Tracker
            </span>
          </Link>
          <nav className="flex-1">
            <ToggleGroup
              type="single"
              value={pathname}
              className="justify-center"
            >
              {navItems.map(({ value, label, icon: Icon, path }) => (
                <ToggleGroupItem key={value} value={path} asChild>
                  <Link
                    to={path}
                    className="flex items-center px-3 py-2"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </nav>
          <div className="flex items-center space-x-2">
            {user ? (
              <Button onClick={handleSignOut} variant="ghost">
                Sign Out
              </Button>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="w-6 h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-6 h-6 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
