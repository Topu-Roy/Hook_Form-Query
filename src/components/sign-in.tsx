import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { InputField } from "./InputField";
import { Button } from "./ui/button";

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
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting },
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
    <div className="h-[28rem] p-4">
      <h2 className="text-center text-xl font-semibold">Sign in</h2>
      <form
        className="flex h-full w-full flex-col items-center justify-center space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          control={control}
          id="Email_Field"
          label="Email"
          name="email"
          placeholder="example@mail.com"
          type="email"
        />
        <InputField
          control={control}
          id="Password_Field"
          label="Password"
          name="password"
          type="password"
        />

        <div className="flex w-full flex-1 items-end justify-end pb-4">
          <Button
            disabled={isSubmitting || isLoading}
            variant={"outline"}
            className="w-[50%] border border-black py-6 transition-colors hover:bg-blue-600"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
