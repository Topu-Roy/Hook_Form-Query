import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCartProductsQuery } from "@/query/cart";
import { cn } from "@/lib/utils";

export default function ProtectedLayout() {
  const navigator = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { data } = useCartProductsQuery();

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
        <div className="inline-flex items-center justify-between gap-7">
          <Link to={"/cart"} className="relative">
            <Button variant={"outline"} className="rounded-full p-2">
              <ShoppingCart />
              <div
                className={cn(
                  "absolute -right-[25%] -top-[25%] flex size-6 items-center justify-center rounded-full bg-red-300",
                  data ? (data.length < 1 ? "hidden" : "") : "",
                )}
              >
                {data?.length ?? 0}
              </div>
            </Button>
          </Link>
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="rounded-full p-2">
                  <User />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="text-center">
                <p className="font-bold text-black/90">{user?.name}</p>
                <p className="font-medium text-black/60">{user?.email}</p>
              </PopoverContent>
            </Popover>
          ) : null}
          <Button onClick={logout}>Log Out</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
