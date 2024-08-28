import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useNewLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "./ui/button";
import { InputField } from "./InputField";
import { useEffect, useState } from "react";
import { UserType } from "@/context/auth-context";
import { useAuth } from "@/hooks/useAuth";

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
  const { handleAuthenticate } = useAuth();
  const [allUsersArray, setAllUsersArray] = useState<UserType[]>([]);
  const { getItem: getUsersArray, setItem: updateUsersArray } =
    useNewLocalStorage<UserType[]>("allUsersArray");
  const navigator = useNavigate();

  useEffect(() => {
    const users = getUsersArray();

    if (users) {
      setAllUsersArray(users);
    }
  }, [getUsersArray]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const newUser = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    const isExist = allUsersArray.find((user) => user.email === data.email);

    if (isExist) {
      alert("user already exist.");
    } else {
      updateUsersArray([...allUsersArray, newUser]);
      handleAuthenticate({ email: data.email, password: data.password });
    }

    navigator("/auth/sign-in");
  };

  useEffect(() => {
    console.log(allUsersArray);

    return () => console.log(allUsersArray);
  }, [allUsersArray]);

  return (
    <div className="h-[28rem] p-4">
      <h2 className="text-center text-xl font-semibold">Register</h2>
      <form
        className="flex h-full w-full flex-col items-center justify-center space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          control={control}
          id="Name_Field"
          label="Name"
          name="name"
          placeholder="jhon doe"
          type="Text"
        />
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
