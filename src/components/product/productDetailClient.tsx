"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  decrementQuantity,
  incrementQuantity,
  setSelectedProduct,
} from "@/lib/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useGetProductByIdQuery } from "@/lib/features/product/productApi";
import { getImageProxySrc } from "@/lib/utils";

// type ProductDetailClientProps = {
//   id?: string;
// };

export default function ProductDetailClient({
  id
}: {id?: string}) {
  const dispatch = useAppDispatch();
  const { selectedProduct, quantity, totalPrice } = useAppSelector(
    (state) => state.product
  );

  const { data: product, isLoading, error } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  useEffect(() => {
    if (product) {
      dispatch(setSelectedProduct(product));
    }
  }, [dispatch, product]);

  if (!id) return <p>Invalid product id</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Failed to load product</p>;

  const currentProduct = selectedProduct ?? product;
  const currentTotalPrice = selectedProduct ? totalPrice : product.price;

  return (
    <main className="container mx-auto my-10 max-w-3xl p-4">
      <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-xl bg-slate-50">
          <Image
            src={getImageProxySrc(currentProduct.images)}
            alt={currentProduct.title}
            fill
            unoptimized
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold text-slate-900">
            {currentProduct.title}
          </h1>
          <p className="text-sm text-slate-600">{currentProduct.description}</p>

          <div className="space-y-1">
            <p className="text-base text-slate-500">
              Unit price: ${currentProduct.price.toFixed(2)}
            </p>
            <p className="text-2xl font-semibold text-rose-500">
              Total: ${currentTotalPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(decrementQuantity())}
              disabled={quantity === 1}
            >
              -
            </Button>
            <span className="min-w-8 text-center text-lg font-medium">
              {quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(incrementQuantity())}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
