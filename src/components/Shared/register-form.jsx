import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { Eye, EyeOff, Ghost, Loader2 } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import ThemeContext from "@/Context/Theme/ThemeContext";
import { useAuth } from "@/Context/Auth";

const RegisterForm = ({ className, ...props }) => {
  const { loading, createUser, setLoading, googlePopUp, updateInfo } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return "Something went wrong. Please try again.";
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((data) => {
        updateInfo(data.user, name, "")
          .then(() => {
            navigate("/");
            setLoading(false);
            toast.success("User Created Successfully");
          })
          .catch((error) => {
            toast.error(error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(getFriendlyError(error.code));
      });
  };
  const handlegooglePopUp = () => {
    googlePopUp()
      .then(() => {
        navigate("/");
        setLoading(false);

        toast.success("Signed in successfully");
      })
      .catch(() => {
        setLoading(false);

        toast.error("Something went wrong. Please try again.");
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
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
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
                  <Button type="submit" disabled={loading} className=" w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <Button
                    onClick={handlegooglePopUp}
                    type="button"
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
                    Sign Up with Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/login"
                  className="underline text-primary underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
};
export default RegisterForm;
