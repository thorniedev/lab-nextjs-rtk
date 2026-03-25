import ProductTable from "@/components/dashboard/product-table";

export default function ProductDashboardPage() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Product dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Manage product records, review the current catalog, and open the form
          to add a new item.
        </p>
      </div>

      <ProductTable />
    </section>
  );
}
