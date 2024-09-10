// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "@/hooks/useTheme";
// import { useLocation } from "react-router";

// import {
//   Dumbbell,
//   Home,
//   ClipboardList,
//   TrendingUp,
//   Settings,
//   Menu,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// const navItems = [
//   { name: "Home", href: "/", icon: Home },
//   { name: "Workouts", href: "/workouts", icon: Dumbbell },
//   { name: "Exercises", href: "/exercises", icon: ClipboardList },
//   { name: "Progress", href: "/progress", icon: TrendingUp },
//   { name: "Settings", href: "/settings", icon: Settings },
// ];

// export function Header() {
//   const { pathname } = useLocation();
//   const { theme, setTheme } = useTheme();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex items-center h-14">
//         <div className="hidden mr-4 md:flex">
//           <a href="/" className="flex items-center mr-6 space-x-2">
//             <Dumbbell className="w-6 h-6" />
//             <span className="hidden font-bold sm:inline-block">
//               Workout Tracker
//             </span>
//           </a>
//           <nav className="flex items-center space-x-6 text-sm font-medium">
//             {navItems.map((item) => (
//               <a
//                 key={item.href}
//                 href={item.href}
//                 className={`transition-colors hover:text-foreground/80 ${
//                   pathname === item.href
//                     ? "text-foreground"
//                     : "text-foreground/60"
//                 }`}
//               >
//                 {item.name}
//               </a>
//             ))}
//           </nav>
//         </div>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button
//               variant="ghost"
//               className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
//             >
//               <Menu className="w-5 h-5" />
//               <span className="sr-only">Toggle Menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="pr-0">
//             <MobileNav />
//           </SheetContent>
//         </Sheet>
//         <div className="flex items-center justify-between flex-1 space-x-2 md:justify-end">
//           <div className="flex-1 w-full md:w-auto md:flex-none">
//             {/* Add search functionality here if needed */}
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             aria-label="Toggle Theme"
//             className="mr-6"
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           >
//             <Sun className="w-6 h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute w-6 h-6 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
//             <span className="sr-only">Toggle Theme</span>
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// function MobileNav() {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex flex-col space-y-3">
//       {navItems.map((item) => (
//         <a
//           key={item.href}
//           href={item.href}
//           className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent ${
//             pathname === item.href ? "bg-accent" : "transparent"
//           }`}
//         >
//           <item.icon className="w-4 h-4 mr-2" />
//           {item.name}
//         </a>
//       ))}
//     </div>
//   );
// }

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="container flex items-center h-14">
          <a href="/" className="flex items-center mr-6 space-x-2">
            <Dumbbell className="w-6 h-6" />
            <span className="hidden font-bold sm:inline-block">
              Workout Tracker
            </span>
          </a>
          <nav className="flex-1">
            <ToggleGroup
              type="single"
              value={pathname}
              className="justify-center"
            >
              {navItems.map(({ value, label, icon: Icon, path }) => (
                <ToggleGroupItem key={value} value={path} asChild>
                  <a
                    href={path}
                    className="flex items-center px-3 py-2"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{label}</span>
                  </a>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="ml-auto"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="w-6 h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute w-6 h-6 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
