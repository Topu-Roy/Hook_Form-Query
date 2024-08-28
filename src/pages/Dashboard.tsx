import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <p className="pt-14 text-center">
      Hello 👋, <span className="text-lg font-semibold">{user?.name}.</span>
    </p>
  );
}
