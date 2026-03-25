import ProductForm from "@/components/form/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Edit product</h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Update the product information and submit the same form to save your
          changes.
        </p>
      </div>

      <div className="flex justify-center lg:justify-start">
        <ProductForm productId={id} />
      </div>
    </section>
  );
}
