import ProfileUpdate from "@/components/Shared/profile-update";

import { useAuth } from "@/Context/Auth";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Profile() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }
  return (
    <div className="flex  min-h-svh w-full items-center justify-center p-6 md:p-10">
      <ProfileUpdate />
    </div>
  );
}
