import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const navigator = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigator("/auth/sign-in");
  }, [isAuthenticated]);

  return (
    <div>
      <Button onClick={() => logout()}>Log Out</Button>
    </div>
  );
}
