import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export default function ProtectedLayout() {
  const navigator = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigator("/auth/sign-in", { replace: true });
  }, [isAuthenticated]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl space-y-4">
      <div className="flex items-center justify-between border-b border-gray-950/40 py-4">
        <div className="space-x-2">
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "group inline-flex items-center justify-center rounded-md bg-gray-500/30 hover:text-white"
                : "inline-flex items-center justify-center rounded-md"
            }
          >
            <Button
              variant={"ghost"}
              className="h-full bg-transparent group-hover:bg-gray-500"
            >
              Dashboard
            </Button>
          </NavLink>
          <NavLink
            to={"/products"}
            className={({ isActive }) =>
              isActive
                ? "group inline-flex items-center justify-center rounded-md bg-gray-500/30 hover:text-white"
                : "inline-flex items-center justify-center rounded-md"
            }
          >
            <Button
              variant={"ghost"}
              className="h-full bg-transparent group-hover:bg-gray-500"
            >
              Products
            </Button>
          </NavLink>
        </div>
        <div className="inline-flex items-center justify-between gap-2">
          <Button variant={"ghost"}>profile</Button>
          <Button onClick={logout}>Log Out</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
