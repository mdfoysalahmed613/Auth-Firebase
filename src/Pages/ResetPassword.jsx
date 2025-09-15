import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import auth from "@/Config/firebase";

import ThemeContext from "@/Context/Theme/ThemeContext";
import { useAuth } from "@/Context/Auth";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { Eye, EyeOff, Ghost, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function ResetPassword() {
  const { loading, user, setLoading } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then()
        .catch(() => {
          toast.error("Invalid or expired reset link");
          navigate("/forgot-password");
        });
    }
  }, [oobCode, navigate]);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password has been reset successfully!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to reset password");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, navigate, loading]);
  if (loading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm ">
        <Card>
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="py-6"
          >
            <CardHeader>
              <CardTitle>Reset password</CardTitle>
              <CardDescription>
                Enter your new password to reset your password.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleResetPassword}>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">New Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      minLength={6}
                      required
                    />
                    <div>
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        variant={Ghost}
                        className="absolute right-0 top-0  "
                      >
                        {showPassword ? (
                          <EyeOff className="text-gray-500" />
                        ) : (
                          <Eye className="text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Setting new
                      password...
                    </>
                  ) : (
                    "Set new password"
                  )}
                </Button>
              </form>
            </CardContent>
          </MagicCard>
        </Card>
      </div>
    </div>
  );
}
