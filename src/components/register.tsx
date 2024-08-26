import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserType } from "./sign-in";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { setItem: updateUsersArray, data: usersArray } =
    useLocalStorage<UserType[]>("allUsersArray");
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const newUser = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    if (Array.isArray(usersArray)) {
      updateUsersArray([...usersArray, newUser]);
    } else {
      updateUsersArray([newUser]);
    }

    navigator("/auth/sign-in");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

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
