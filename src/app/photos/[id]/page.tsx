import Image from "next/image";
import { productType } from "@/types/productType";
import { fetchData } from "@/data/fetchData";
import { getImageProxySrc } from "@/lib/utils";
import { notFound } from "next/navigation";

export const revalidate = 60; 

// type Props = {
//   params: Promise<{ id: string }>;
// };

export default async function ProductDetailPage({ params }: {params: { id: string }}) {

  const { id } = await params;
  const product: productType = await fetchData(`products/${id}`);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto my-10 p-4">
       <h1 className="text-3xl font-bold">{product.title}</h1>
       <p className="text-2xl text-rose-500">${product.price}</p>
       <div className="relative my-4 h-[300px] w-[300px] max-w-full">
         <Image
           src={getImageProxySrc(product.images)}
           alt={product.title}
           fill
           unoptimized
           className="object-contain"
           sizes="300px"
         />
       </div>
        <p>{product.description}</p>
    </main>
  );
}
