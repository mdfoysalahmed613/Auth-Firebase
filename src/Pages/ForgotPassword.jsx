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
import AuthContext from "@/Context/AuthContext";
import ThemeContext from "@/Context/ThemeContext";
import { Loader2 } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const {theme} = useContext(ThemeContext)
  const { sendResetEmail, loading, setLoading } = useContext(AuthContext);
  const handleSendResetEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendResetEmail(email)
      .then(() => {
        setLoading(false);
        toast.success("Reset link sent to your email.")
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong.")
        console.log(error);
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
 
  <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm ">
        <Card>
          <MagicCard
                  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                  className="py-6"
                >
          <CardHeader>
            <CardTitle>Find your account</CardTitle>
            <CardDescription>
              Enter your email address to send reset password link
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSendResetEmail}>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>
              <Button disabled={loading} type="submit" className="w-full mt-4">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Reset email
                    sending...
                  </>
                ) : (
                  "Send Verification Email"
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
