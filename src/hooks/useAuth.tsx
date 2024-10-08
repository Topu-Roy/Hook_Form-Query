import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  return { ...authContext };
}
