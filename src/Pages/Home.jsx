import Particles from "@/components/magicui/Particles";
import NavBar from "@/components/Shared/nav-bar";

import { useAuth } from "@/Context/Auth";
import { Loader2 } from "lucide-react";
import React, { useContext } from "react";
import { useTheme } from "@/Context/Theme";

export default function Home() {
  const { loading } = useAuth();
  const { darkMode } = useTheme();
  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Particles */}
      {(darkMode) && (
        <Particles
          particleCount={400}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      )}

      <NavBar />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to My App
        </h1>
        <p className="mt-4 text-lg md:text-xl  max-w-2xl">
          This is a simple Authentication project with Firebase. The most secure
          lighting serverless web app.
        </p>
      </div>
    </div>
  );
}
