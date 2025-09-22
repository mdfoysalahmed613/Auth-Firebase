import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved): true;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem('darkMode',JSON.stringify(darkMode))
  }, [darkMode]);

  const ThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <ThemeContext value={{darkMode,ThemeToggle}}>{children}</ThemeContext>
  );
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
  
};

export { ThemeProvider, useTheme };
