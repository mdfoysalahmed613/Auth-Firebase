import LoginForm from "@/components/login-form";
import AuthContext from "@/Context/AuthContext";
import { Loader2 } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
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
    <div className="flex  min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
