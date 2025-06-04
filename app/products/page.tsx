"use client";
import { useEffect, useState } from "react";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useRouter } from "next/navigation";
import { Product } from "../types";
import api from "@/lib/api";
import ProductListWithPagination from "../components/ProductListWithPagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      router.push("/");
    } else {
      fetchProducts();
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="py-[3.2rem] pl-[24.0rem] pr-[30rem]">
        <h3 className="text-[3.2rem] font-semibold mb-[5rem]">
          All Products Listing
        </h3>
        <div className="grid grid-cols-3 gap-[2rem]">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-[3.2rem] pl-[24.0rem] pr-[30rem]">
      <h3 className="text-[3.2rem] font-semibold mb-[5rem]">
        All Products Listing
      </h3>
      <ProductListWithPagination products={products} />
    </div>
  );
}
