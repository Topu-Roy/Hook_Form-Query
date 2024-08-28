import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function AuthenticationLayout() {
  const { isAuthenticated } = useAuth();
  const navigator = useNavigate();
  useEffect(() => {
    navigator("/auth/register");
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigator("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[90%] max-w-3xl">
        <div className="flex items-center justify-center gap-4 p-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-full rounded-md bg-blue-600"
                : "w-full rounded-md bg-primary"
            }
            to={"/auth/register"}
          >
            <Button className="flex w-full items-center justify-center bg-inherit py-6">
              Register
            </Button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-full rounded-md bg-blue-600"
                : "w-full rounded-md bg-primary"
            }
            to={"/auth/sign-in"}
          >
            <Button className="flex w-full items-center justify-center bg-inherit py-6">
              Sign in
            </Button>
          </NavLink>
        </div>
        <div className="mb-4">
          <Outlet />
        </div>
      </Card>
    </div>
  );
}
