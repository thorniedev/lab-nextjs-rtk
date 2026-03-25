import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Dashboard home
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Use the sidebar to open the product table or the product form.
        </p>
      </div>

      <Card className="border-dashed bg-muted/20">
        <CardHeader>
          <CardTitle>Quick guide</CardTitle>
          <CardDescription>
            Navigate from the sidebar:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>`Home` opens this page.</p>
          <p>`Product - Product table` shows all product data.</p>
          <p>`Product - Product form` opens the add product form.</p>
        </CardContent>
      </Card>
    </section>
  );
}
