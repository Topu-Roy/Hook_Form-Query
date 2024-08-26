import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Authentication() {
  const navigator = useNavigate();
  useEffect(() => {
    navigator("/auth/register");
  }, []);

  return (
    <div>
      <div>
        <Link to={"/auth/register"}>
          <button>Register</button>
        </Link>
        <Link to={"/auth/sign-in"}>
          <button>Sign in</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
