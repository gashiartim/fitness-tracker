import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);
