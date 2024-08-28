import { products, ProductType } from "@/assets/products";

let productList = [...products];

export async function getAllProducts(): Promise<ProductType[]> {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(productList), 1500),
  );
}

export async function getSingleProduct(
  id: number,
): Promise<ProductType | undefined> {
  const product = productList.find((item) => item.id === id);
  return await new Promise((resolve) =>
    setTimeout(() => resolve(product), 1000),
  );
}

export async function addNewProduct(
  product: ProductType,
): Promise<ProductType[]> {
  productList = [...productList, product];
  return await new Promise((resolve) =>
    setTimeout(() => resolve(productList), 1000),
  );
}
