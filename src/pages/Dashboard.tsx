import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const navigator = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigator("/auth/sign-in");
  }, [isAuthenticated]);

  return <div>Dashboard</div>;
}
