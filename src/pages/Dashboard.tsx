import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Dashboard() {
  const navigator = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigator("/auth/sign-in");
  }, [isAuthenticated]);

  return <div>Dashboard</div>;
}
