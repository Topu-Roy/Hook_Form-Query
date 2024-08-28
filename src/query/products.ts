import { type ProductType } from "@/assets/products";
import {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
} from "@/server/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProductQuery() {
  const methods = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getAllProducts();
      return data;
    },
  });

  return { ...methods };
}

export function useSingleProductQuery(id: number) {
  const methods = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const data = await getSingleProduct(id);
      return data;
    },
  });

  return { ...methods };
}

export function useAddProductMutation() {
  const queryClient = useQueryClient();
  const methods = useMutation({
    mutationFn: async ({ product }: { product: ProductType }) =>
      addNewProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { ...methods };
}
