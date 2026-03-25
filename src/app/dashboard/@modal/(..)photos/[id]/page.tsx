import ProductModal from "./modal";
import { fetchData } from "@/data/fetchData";
import { productType } from "@/types/productType";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModalPage({ params }: Props) {
  const { id } = await params;

  const product: productType = await fetchData(`products/${id}`);
  if (!product) notFound();

  return <ProductModal product={product} />;
}
