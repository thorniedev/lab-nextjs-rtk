"use client";
import Image from "next/image";
import { Product, ProductResponse } from "../../types/productType";
import { getImageProxySrc } from "@/lib/utils";

type ProductCardProps = Pick<Product | ProductResponse, "images" | "title" | "description">;

export default function ProductCard({
  images,
  title,
  description,
}: ProductCardProps) {
  return (
    <div>
      <div className="relative min-h-[400px] w-full">
        <Image
          src={getImageProxySrc(images)}
          alt={title}
          fill
          unoptimized
          className="object-contain"
          sizes="300px"
        />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>

    // <>
    //     <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-2xl shadow-md border border-slate-100 overflow-hidden h-full">
    //       <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

    //       <Image
    //         src={images?.[0]}
    //         alt={title}
    //         className="relative z-20 aspect-video w-full object-contain brightness-60 grayscale dark:brightness-60"
    //         width={300}
    //         height={400}
    //       />
    //       <CardHeader>
    //         <CardAction>
    //           <Badge variant="secondary">Details</Badge>
    //         </CardAction>
    //         <CardTitle className="text-base font-semibold text-slate-900 line-clamp-2">
    //           {title}
    //         </CardTitle>
    //         <CardDescription className="mt-1 text-sm text-slate-600 line-clamp-3">
    //           {description}
    //         </CardDescription>
    //       </CardHeader>
    //       <CardFooter>
    //         <Button className="w-full">Buy Now</Button>
    //       </CardFooter>
    //     </Card>
    //   </>
  );
}
