import React from "react";

export type Theme = "light" | "dark";
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});
