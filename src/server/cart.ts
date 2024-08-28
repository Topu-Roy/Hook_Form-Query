import { type ProductType } from "@/assets/products";

export interface CartProductType extends ProductType {
  quantity: number;
}

let productList: CartProductType[] = [];

export async function getAllCartProducts(): Promise<CartProductType[]> {
  return new Promise((resolve) => setTimeout(() => resolve(productList), 500));
}

export async function addNewCartProduct(
  product: CartProductType,
): Promise<CartProductType[]> {
  function addProduct(): CartProductType[] {
    const itemExist = productList.find((item) => item.id === product.id);
    if (itemExist) {
      productList = productList.map((item) =>
        item.id === itemExist.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      productList.push(product);
    }
    return productList;
  }

  return new Promise((resolve) => setTimeout(() => resolve(addProduct()), 500));
}

export async function updateQuantity(
  id: number,
  quantity: 1 | -1,
): Promise<CartProductType[]> {
  function updateList(): CartProductType[] {
    const itemExist = productList.find((item) => item.id === id);
    if (itemExist) {
      productList = productList
        .map((item) =>
          item.id === itemExist.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }
    return productList;
  }

  return new Promise((resolve) => setTimeout(() => resolve(updateList()), 500));
}

export async function removeProduct(id: number): Promise<CartProductType[]> {
  function updateList(): CartProductType[] {
    productList = productList.filter((item) => item.id !== id);
    return productList;
  }

  return new Promise((resolve) =>
    setTimeout(() => resolve(updateList()), 1000),
  );
}
