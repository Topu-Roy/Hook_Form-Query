import { products } from "@/assets/products";

function* createIdGenerator() {
  let id = products.length + 1;
  while (true) {
    yield id++;
  }
}

const idGenerator = createIdGenerator();

export function getNewId(): number {
  return idGenerator.next().value as number;
}
