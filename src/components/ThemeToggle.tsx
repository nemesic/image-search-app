import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextDef";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className="theme-toggle-btn flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему"
      }
      title={theme === "dark" ? "Світла тема" : "Темна тема"}
    >
      {theme === "dark" ? (
        <>
          <span role="img" aria-label="light">
            🌞
          </span>{" "}
          Light
        </>
      ) : (
        <>
          <span role="img" aria-label="dark">
            🌙
          </span>{" "}
          Dark
        </>
      )}
    </button>
  );
};
