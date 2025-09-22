import { useTheme } from "@/Context/Theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { darkMode, ThemeToggle } = useTheme();

  return (
    <button
      onClick={ThemeToggle}
      className=""
    >
      {darkMode ? <Sun /> : <Moon />}
    </button>
  );
}
