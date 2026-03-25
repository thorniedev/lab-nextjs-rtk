"use client";

import ProductCard from "@/components/product/productCard";
import { productType } from "@/types/productType";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function ProductModal({ product }: { product: productType }) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="border-b px-6 py-4 flex justify-between">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <button onClick={close} className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
        </div>

        <div className="p-6">
          <ProductCard
            title={product.title}
            description={product.description || ""}
            images={product.images}
          />
        </div>
      </div>
    </div>
  );
}
