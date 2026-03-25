import ProductDetailClient from "@/components/product/productDetailClient";




export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const { id } = await params;
  const productId = id?.[0];

  return <ProductDetailClient  id={productId} />;
}
