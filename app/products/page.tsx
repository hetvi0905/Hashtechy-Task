import { Product } from "../types";
import api from "@/lib/api";
import ProductListWithPagination from "../components/ProductListWithPagination";

async function getProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  return res.data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div className="py-[3.2rem] px-[24.0rem]">
        <h3 className="text-[3.2rem] font-semibold mb-[5rem]">
          All Products Listing
        </h3>
        <ProductListWithPagination products={products} />
      </div>
    </>
  );
}
