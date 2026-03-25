"use client";

import { useGetProductByIdQuery } from "@/lib/features/product/productApi";

export default function ProductDetailClient({ id }: { id?: string }) {
  const { data, isLoading, error } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  if (!id) return <p>Invalid product id</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load product</p>;

  return  <div>{data?.title}</div>;
}
