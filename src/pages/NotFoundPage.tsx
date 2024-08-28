import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth();
  const navigator = useNavigate();

  if (isAuthenticated) {
    navigator("/dashboard", { replace: true });
  }

  if (!isAuthenticated) {
    navigator("/auth/register", { replace: true });
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold tracking-wide">Page not found</h2>
      <p>
        Go back to{" "}
        <Link to={"/"} className="underline">
          home.
        </Link>
      </p>
    </div>
  );
}
