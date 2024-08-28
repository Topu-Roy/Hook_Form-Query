import {
  addNewCartProduct,
  type CartProductType,
  getAllCartProducts,
  removeProduct,
  updateQuantity,
} from "@/server/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCartProductsQuery() {
  const values = useQuery({
    queryKey: ["cart"],
    queryFn: () => getAllCartProducts(),
  });

  return { ...values };
}

export function useUpdateQuantityMutation() {
  const queryClient = useQueryClient();
  const values = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: 1 | -1 }) =>
      updateQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { ...values };
}

export function useAddCartProductMutation() {
  const queryClient = useQueryClient();
  const values = useMutation({
    mutationFn: (product: CartProductType) => addNewCartProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { ...values };
}

export function useRemoveProductMutation() {
  const queryClient = useQueryClient();
  const values = useMutation({
    mutationFn: (id: number) => removeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { ...values };
}
