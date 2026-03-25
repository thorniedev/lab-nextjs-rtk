import { productType } from "../../types/productType";
import ProductCard from "../../components/product/productCard";
import Link from "next/link";
import { fetchAllProducts } from "@/lib/data/products";
export const dynamic = "force-dynamic";

export default async function ProductsList() {

  const products: productType[] = await fetchAllProducts();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <main className="">
      <section className="w-full mx-auto my-10">
        <h2 className="font-bold text-[24px] text-blue-700 uppercase text-center">
          Products Page
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {/* Render cards */}
          {
            products.map((products) => (
              <Link href={`/products/${products.id}`} key={products.id}>
                <ProductCard
                  title={products.title}
                  description={products.description}
                  images={products.images}
                />
              </Link>
            ))
          }
        </div>
      </section>
    </main>
  );
}
