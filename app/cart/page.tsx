"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/redux/store";
import { updateQuantity, removeFromCart } from "@/app/redux/cartSlice";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch<AppDispatch>();

  const handleIncrease = (id: number, currentQty: number) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id: number, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="py-[3.2rem] mx-auto">
      <h1 className="text-[3.2rem] font-semibold text-center mb-[4.8rem]">
        My Cart
      </h1>

      <div className="pl-[24.0rem]">
        {cartItems.length === 0 ? (
          <p className=" text-[1.6rem]">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-[400px_100px_400px] gap-[2rem] mb-[2.4rem] font-semibold text-[2rem] pb-4">
              <div className="pl-[2rem]">Name</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
            </div>

            <div className="space-y-[3.2rem]">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[400px_100px_400px] gap-[2rem] items-center py-[1.6rem]"
                >
                  <div className="flex gap-6 pl-[2rem]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-contain w-[8rem] h-[8rem] image-class rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-[1.8rem] font-medium mb-[0.8rem]">
                        {item.title}
                      </h4>
                      <p className="text-[1.4rem] text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-[1.8rem] font-semibold">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleDecrease(item.id, item.quantity)}
                      className="cursor-pointer text-[2.4rem] w-[2.8rem] h-[3.5rem] text-white bg-[#3F3F3F]"
                    >
                      -
                    </button>
                    <span className="text-center w-[2.8rem] h-[3.5rem] text-black bg-white text-[2.4rem] font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id, item.quantity)}
                      className="cursor-pointer text-[2.4rem] w-[2.8rem] h-[3.5rem] text-white bg-[#3F3F3F]"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-[400px_100px_400px] gap-[2rem] items-center py-[1.6rem]">
                <div className="pl-[2rem]"></div>
                <div className="text-center">
                  <span className="text-[2.4rem] font-bold">Total</span>
                </div>
                <div className="text-center">
                  <span className="text-[2.8rem] font-bold">
                    {total.toFixed(2)} /-
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
