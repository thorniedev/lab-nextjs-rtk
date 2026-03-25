import ProductForm from "@/components/form/product-form";

export default function DashboardCreateProductPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Create product</h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Use the existing product form to upload images and create a new
          product through RTK Query.
        </p>
      </div>

      <div className="flex justify-center lg:justify-start">
        <ProductForm />
      </div>
    </section>
  );
}
