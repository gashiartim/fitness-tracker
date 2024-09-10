import React from "react";
import ThemeToggle from "../components/shared/ThemeToggle";

const Settings: React.FC = () => {
  return (
    <div>
      <h1>Settings</h1>
      <h2>Theme</h2>
      <ThemeToggle />
      {/* Add other settings options */}
    </div>
  );
};

export default Settings;
