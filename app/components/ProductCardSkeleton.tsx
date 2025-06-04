"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      <div className="relative w-full bg-gray-300 rounded-md h-[245px] max-w-[259px]" />

      <div className="flex-1 flex flex-col mt-[1.4rem]">
        <div className="bg-gray-300 h-[2rem] w-[80%] rounded-md mb-[0.5rem]" />
        <div className="bg-gray-300 h-[1.6rem] w-full rounded-md mb-[0.3rem]" />
        <div className="bg-gray-300 h-[1.6rem] w-[90%] rounded-md mb-[0.3rem]" />
        <div className="bg-gray-300 h-[1.6rem] w-[60%] rounded-md mb-[0.6rem]" />
        <div className="bg-gray-300 h-[3rem] w-full rounded-md" />
      </div>
    </div>
  );
}
