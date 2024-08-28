import { ProductType } from "@/assets/products";
import AddProductForm from "@/components/addProductForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAddProductMutation, useProductQuery } from "@/query/products";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useProductQuery();
  const { mutate } = useAddProductMutation();

  function addNewProduct(product: ProductType) {
    mutate({ product });
    setShowForm(false);
  }

  return (
    <div className="pb-8">
      <Button
        onClick={() => setShowForm(!showForm)}
        variant={"outline"}
        className="mb-4"
      >
        {!showForm ? "Add product" : "Close Form"}
      </Button>
      {showForm ? <AddProductForm addNewProduct={addNewProduct} /> : null}
      {!isLoading ? (
        <div className="flex flex-wrap items-start justify-between gap-2">
          {data?.map((item) => (
            <Card key={item.id} className="max-w-[26rem] overflow-hidden p-2">
              <img src={item.image} alt={item.name} className="rounded-md" />
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-black/80">{item.description}</p>
              <p className="text-lg font-semibold">{item.price}</p>
              <div className="flex w-full items-center justify-between gap-2 pt-2">
                <Link className="w-full" to={`/products/${item.id}`}>
                  <Button variant={"outline"} className="w-full border">
                    Details
                  </Button>
                </Link>
                <Button className="w-full">Add To Cart</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
