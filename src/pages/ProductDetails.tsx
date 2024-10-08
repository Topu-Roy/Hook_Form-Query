import { Button } from "@/components/ui/button";
import { useAddCartProductMutation } from "@/query/cart";
import { useSingleProductQuery } from "@/query/products";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ProductDetails() {
  const { mutate, isPending } = useAddCartProductMutation();
  const { id } = useParams();
  const { data: product, isLoading, error } = useSingleProductQuery(Number(id));

  function addToCart() {
    if (!product) return;
    mutate({ ...product, quantity: 1 });
  }

  if (isLoading) {
    return (
      <div className="py-8 text-center text-lg font-medium">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-lg font-medium">
        <p>Error: {error.message}</p>
        <Link to={`/products`}>
          <Button variant={"outline"} className="w-full border">
            All products
          </Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-lg font-medium">
        <p>Product not found</p>
        <Link to={`/products`}>
          <Button variant={"outline"} className="w-full border">
            All products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-md"
      />
      <div className="h-full w-full">
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-sm text-black/80">{product.description}</p>
        <p className="text-lg font-semibold">{product.price}</p>
        <div className="flex w-full items-end justify-between gap-2 pt-8">
          <Link className="w-full" to={`/products`}>
            <Button variant={"outline"} className="w-full border">
              All products
            </Button>
          </Link>
          <Button onClick={addToCart} className="w-full">
            {isPending ? <Loader2 className="animate-spin" /> : "Add To Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
