import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "./ui/card";
import { getNewId } from "@/lib/idGenerator";
import { type ProductType } from "@/assets/products";

export const Schema = z.object({
  name: z
    .string({ message: "Please provide a name" })
    .min(4, { message: "Name is too short" }),
  description: z
    .string({ message: "Please provide a description" })
    .min(8, { message: "Description too short" }),
  price: z.number({ message: "Please give a valid price in number" }),
});

type FormData = z.infer<typeof Schema>;

type Props = {
  addNewProduct: (product: ProductType) => void;
};

export default function AddProductForm({ addNewProduct }: Props) {
  const [showForm, setShowForm] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: FormData) => {
    const newId = getNewId();
    addNewProduct({
      id: newId,
      ...data,
      price: `$${data.price}`,
      image: `https://placehold.co/600x400?text=Product+${newId}`,
    });

    setShowForm(false);
  };

  return showForm ? (
    <Card className="mb-4 p-4">
      <form
        className="flex h-full w-full flex-col items-center justify-center space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          control={control}
          id="Name_Field"
          label="Name"
          name="name"
          type="text"
        />

        <InputField
          control={control}
          id="Description_Field"
          label="Description"
          name="description"
          type="text"
        />

        <InputField
          control={control}
          id="Price_Field"
          label="Price"
          valueAsNumber={true}
          name="price"
          type="number"
        />

        <div className="flex w-full flex-1 items-end justify-end gap-2">
          <Button
            disabled={isSubmitting || isLoading}
            onClick={() => setShowForm(false)}
            variant={"destructive"}
            className="px-8 py-4 transition-colors"
          >
            close
          </Button>
          <Button
            disabled={isSubmitting || isLoading}
            type="submit"
            variant={"default"}
            className="px-8 py-4 transition-colors hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  ) : null;
}
