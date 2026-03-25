
import Loading from "./loading";
import ProductInsertPage from "./product-insert";
import { Suspense } from "react";
import ProductListClient from "./ProductListClient";
// import { products } from '../data/product';

export const dynamic = 'force-dynamic';


export default async function ProductsPage() {

  // throw new Error("Failed to load products list!");

  return (
    <Suspense fallback={<Loading />}>
      {/* <productListClient /> */}
      <ProductInsertPage />
      {/* <ProductsList /> */}
      <ProductListClient />
    </Suspense>
  )
}
