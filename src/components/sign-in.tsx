import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type CurrentUserType = Omit<UserType, "password">;

export default function SignIn() {
  const navigator = useNavigate();
  const { isAuthenticated, handleAuthenticate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    handleAuthenticate(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigator("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
