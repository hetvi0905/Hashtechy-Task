"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { Product } from "../types";
import { addToCart } from "../redux/cartSlice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    router.push("/cart");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative w-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={259}
          height={245}
          className="max-w-[259px] image-class w-full object-contain h-[245px]"
        />
      </div>

      {/* Flex container for content that grows */}
      <div className="flex-1 flex flex-col">
        <h4 className="mt-[1.4rem] text-[1.6rem] font-medium line-clamp-2">
          {product.title}
        </h4>
        <p className="mt-[0.3rem] text-[1.4rem] font-normal text-[#424242] line-clamp-3 flex-1">
          {product.description}
        </p>
        <p className="mt-[0.6rem] text-[1.6rem] font-semibold">
          ₹ {product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          className="cursor-pointer mt-[0.7rem] w-full bg-[#3F3F3F] font-semibold text-[1.6rem] text-white py-[0.8rem]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
