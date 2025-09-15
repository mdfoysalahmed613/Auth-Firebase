import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeAlert, Loader2, LogOut, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { toast } from "sonner";
import { useAuth } from "@/Context/Auth";

export default function NavBar() {
  const { user, loading, setLoading, verifyEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleVerifyEmail = () => {
    verifyEmail()
      .then(() => {
        toast.success("Verification email sent");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  if (loading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return (
    <nav className="flex absolute z-10 top-0 w-full px-4 md:px-56 justify-between items-center py-4">
      <div>
        <Link className="text-2xl font-bold" to="/">
          Authentication
        </Link>
      </div>

      <div className="flex gap-3">
        <ThemeToggle />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="rounded-lg">
                <AvatarImage
                  className="w-10 h-10 rounded-full"
                  src={user?.photoURL}
                  alt={user?.displayName || "User avatar"}
                />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-32" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User />
                  Profile
                </DropdownMenuItem>

                {!user?.emailVerified && (
                  <DropdownMenuItem onClick={handleVerifyEmail}>
                    <BadgeAlert />
                    Verify Email
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>

              <DropdownMenuItem variant="destructive" onClick={() => logout()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-1 md:gap-3">
            <Button onClick={() => navigate("/login")} variant="outline">
              Login
            </Button>
            <Button onClick={() => navigate("/register")}>SignUp</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
