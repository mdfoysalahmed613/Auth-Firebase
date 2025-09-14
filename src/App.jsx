import React, { useContext } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import ClickSpark from "./components/magicui/ClickSpark";
import ThemeContext from "./Context/ThemeContext";

export default function App() {
  const {theme} =useContext(ThemeContext)
  return (
    <ClickSpark
      sparkColor={theme === "dark" ? "#fff": "#2B2B2B"}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Toaster position="top-center" richColors />
      <Outlet />
    </ClickSpark>
  );
}
