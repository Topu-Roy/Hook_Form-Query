import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCartProductsQuery,
  useRemoveProductMutation,
  useUpdateQuantityMutation,
} from "@/query/cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Minus, Plus } from "lucide-react";

export default function Cart() {
  const [showLoaderId, setShowLoaderId] = useState<number | null>(null);
  const { data, isLoading, error, refetch } = useCartProductsQuery();
  const { mutate: updateQuantity, isPending } = useUpdateQuantityMutation();
  const { mutate: removeFromCart, isPending: isRemoving } =
    useRemoveProductMutation();

  function handleRemove(id: number) {
    setShowLoaderId(id);
    removeFromCart(id, {
      onSettled: () => {
        setShowLoaderId(null);
      },
    });
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10">
        <p>Loading cart...</p>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (data) {
    if (data.length === 0) {
      return (
        <>
          <Button variant={"outline"} onClick={() => refetch()}>
            Refresh
          </Button>
          <div className="py-10 text-center font-semibold">Cart is Empty.</div>
        </>
      );
    }
  }

  return (
    <>
      <Button variant={"outline"} onClick={() => refetch()}>
        Refresh
      </Button>
      <div className="space-y-3">
        <AnimatePresence>
          {data?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Card className="flex items-center justify-between gap-8 p-2">
                <img
                  className="w-[15%] rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex-1 space-y-2">
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <p>{item.price}</p>
                </div>
                <p>
                  $
                  {parseFloat(item.price.replace(/[^0-9.]/g, "")) *
                    item.quantity}
                </p>
                <div className="inline-flex items-center justify-center gap-2">
                  <Button
                    disabled={isPending || isLoading}
                    onClick={() =>
                      updateQuantity({ id: item.id, quantity: -1 })
                    }
                    className="rounded-full p-2"
                    variant={"outline"}
                  >
                    <Minus />
                  </Button>
                  <p>{item.quantity}</p>
                  <Button
                    disabled={isPending || isLoading}
                    onClick={() => updateQuantity({ id: item.id, quantity: 1 })}
                    className="rounded-full p-2"
                    variant={"outline"}
                  >
                    <Plus />
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    variant={"destructive"}
                    className="w-20"
                  >
                    {isRemoving && showLoaderId === item.id ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Remove"
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
