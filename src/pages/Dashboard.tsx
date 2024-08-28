import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <>
      <p className="pt-14 text-center">
        Hello 👋, <span className="text-lg font-semibold">{user?.name}.</span>
      </p>

      <div className="flex w-full items-center justify-center gap-4">
        <Link to={"/products"}>
          <Button className="w-32" variant={"outline"}>
            View all products
          </Button>
        </Link>
        <Link to={"/cart"}>
          <Button className="w-32" variant={"outline"}>
            View cart
          </Button>
        </Link>
        <Button
          onClick={() => logout()}
          className="w-32"
          variant={"destructive"}
        >
          Log out
        </Button>
      </div>
    </>
  );
}
