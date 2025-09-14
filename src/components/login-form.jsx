import { cn } from "@/lib/utils";
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
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import AuthContext from "@/Context/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, Ghost, Loader2 } from "lucide-react";
import ThemeContext from "@/Context/ThemeContext";
import { MagicCard } from "./magicui/magic-card";

const LoginForm = ({ className, ...props }) => {
  const { theme } = useContext(ThemeContext);
  const getLoginErrorMessage = (code) => {
    switch (code) {
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/invalid-credential":
        return "Invalid Credential";
      default:
        return "Something went wrong. Please try again.";
    }
  };
  const { loginUser, loading, googlePopUp, setLoading } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((data) => {
        setLoading(false);
        navigate("/");
        console.log(data.user);
        toast.success("Login Successful");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(getLoginErrorMessage(error.code));
        console.log(error);
      });
  };
  const handlegooglePopUp = () => {
    googlePopUp()
      .then(() => {
        navigate("/");
        setLoading(false);
        
        toast.success("Login Successful");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="py-6"
        >
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
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
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="ml-auto inline-block text-primary text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
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
                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2 w-4 h-4" />{" "}
                        Logging..
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    onClick={handlegooglePopUp}
                    disabled={loading}
                    variant="outline"
                    className="w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="none"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="underline text-primary underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
};
export default LoginForm;
