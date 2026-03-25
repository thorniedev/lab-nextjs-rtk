"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { z } from "zod";

import { LineShadowText } from "@/components/ui/line-shadow-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { getCategories, uploadImageToServer } from "@/lib/data/products";
import { normalizeImages } from "@/lib/utils";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/lib/features/product/productApi";
import { Category, ProductRequest, ProductResponse } from "@/types/productType";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.preprocess(
    (value) => Number(value),
    z.number().positive({ message: "Price must be a positive number" }),
  ),
  description: z.string().optional().default(""),
  categoryId: z.preprocess(
    (value) => Number(value),
    z.number().int().positive("Category is required"),
  ),
  images: z.custom<FileList | null>().optional(),
});

type FormValues = z.input<typeof formSchema>;
type FormSubmitValues = z.output<typeof formSchema>;

type ProductFormProps = {
  productId?: string;
};

function getCategoryId(category: ProductResponse["category"]) {
  if (category && typeof category === "object" && "id" in category) {
    return Number(category.id);
  }
  return 0;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const isEditMode = Boolean(productId);
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  const router = useRouter();

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: product, isLoading: loadingProduct } = useGetProductByIdQuery(
    productId!,
    { skip: !productId },
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const form = useForm<FormValues, undefined, FormSubmitValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 0,
      images: null,
    },
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (!product) return;

    form.reset({
      title: product.title,
      price: product.price,
      description: product.description ?? "",
      categoryId: getCategoryId(product.category),
      images: null,
    });
    setExistingImages(normalizeImages(product.images));
    setFileInputKey((current) => current + 1);
  }, [form, product]);

  async function onSubmit(values: FormSubmitValues) {
    try {
      toast.loading(isEditMode ? "Updating product..." : "Creating product...");

      let imageUrls = existingImages;

      if (values.images && values.images.length > 0) {
        const uploaded = await Promise.all(
          Array.from(values.images).map((file) => uploadImageToServer(file)),
        );
        imageUrls = uploaded.map((item) => item.location);
      }

      if (!imageUrls.length) {
        toast.dismiss();
        toast.error("Please choose at least one image.");
        return;
      }

      const payload: ProductRequest = {
        title: values.title,
        price: values.price,
        description: values.description ?? "",
        categoryId: values.categoryId,
        images: imageUrls,
      };

      if (isEditMode && productId) {
        await updateProduct({ id: productId, data: payload }).unwrap();
        toast.dismiss();
        toast.success("Product updated successfully!");
      } else {
        await addProduct(payload).unwrap();
        toast.dismiss();
        toast.success("Product created successfully!");
      }

      form.reset();
      setExistingImages([]);
      setFileInputKey((current) => current + 1);
      router.refresh();
      router.push("/dashboard/product");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!!");
      console.error(error);
    }
  }

  function onReset() {
    form.reset({
      title: product?.title ?? "",
      price: product?.price ?? 0,
      description: product?.description ?? "",
      categoryId: getCategoryId(product?.category ?? ""),
      images: null,
    });
    form.clearErrors();
    setExistingImages(normalizeImages(product?.images));
    setFileInputKey((current) => current + 1);
  }

  return (
    <>
      <Card className="relative w-[450px] overflow-hidden">
        <CardHeader>
          <CardTitle className="text-4xl leading-none font-semibold tracking-tighter text-balance sm:text-4xl md:text-4xl lg:text-4xl">
            {isEditMode ? "Update" : "Add New"}
            <LineShadowText className="ml-2 italic" shadowColor={shadowColor}>
              Product
            </LineShadowText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingProduct ? (
            <div className="py-8 text-sm text-muted-foreground">
              Loading product data...
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              onReset={onReset}
              className="space-y-8 @container"
            >
              <div className="grid grid-cols-12 gap-4">
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 flex flex-col items-start gap-2 space-y-0 self-end"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex w-auto!">
                        Product Title
                      </FieldLabel>
                      <Input
                        placeholder="Macbook pro M4"
                        type="text"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="price"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 flex flex-col items-start gap-2 space-y-0 self-end"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex w-auto!">Price</FieldLabel>
                      <Input
                        placeholder="200 USD"
                        type="number"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={
                          typeof field.value === "number" ||
                          typeof field.value === "string"
                            ? field.value
                            : ""
                        }
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 flex flex-col items-start gap-2 space-y-0 self-end"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex w-auto!">
                        Description
                      </FieldLabel>
                      <Input
                        placeholder="Product Description"
                        type="text"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="categoryId"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 flex flex-col gap-2"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel>Category</FieldLabel>
                      <Select
                        value={String(field.value || "")}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingCategories && (
                            <SelectItem value="loading" disabled>
                              Loading categories...
                            </SelectItem>
                          )}
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="images"
                  render={({ field, fieldState }) => (
                    <Field
                      className="col-span-12 flex flex-col items-start gap-2 space-y-0 self-end"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel className="flex w-auto!">
                        Choose Images
                      </FieldLabel>

                      {isEditMode && existingImages.length > 0 && (
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Current images: {existingImages.length}</p>
                          <p>Upload new images only if you want to replace them.</p>
                        </div>
                      )}

                      <Input
                        key={fileInputKey}
                        type="file"
                        multiple
                        onChange={(event) => field.onChange(event.target.files)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <CardFooter className="flex justify-between px-0">
                <Field className="col-span-12 flex flex-col items-start gap-2 space-y-0 self-end">
                  <FieldLabel className="hidden w-auto!">Reset</FieldLabel>
                  <Button className="w-full" type="reset" variant="outline">
                    Reset
                  </Button>

                  <FieldLabel className="hidden w-auto!">Submit</FieldLabel>
                  <Button
                    className="w-full"
                    type="submit"
                    variant="default"
                    disabled={
                      form.formState.isSubmitting ||
                      loadingCategories ||
                      loadingProduct
                    }
                  >
                    {form.formState.isSubmitting
                      ? isEditMode
                        ? "Updating..."
                        : "Submitting..."
                      : isEditMode
                        ? "Update"
                        : "Submit"}
                  </Button>
                </Field>
              </CardFooter>
            </form>
          )}
          <Toaster position="top-center" richColors />
        </CardContent>
        <BorderBeam
          duration={4}
          size={300}
          reverse
          initialOffset={10}
          borderWidth={3}
          className="from-transparent via-green-500 to-transparent"
        />
        <BorderBeam
          size={400}
          initialOffset={10}
          borderWidth={3}
          className="from-transparent via-blue-500 to-transparent"
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 20,
          }}
        />
      </Card>
    </>
  );
}
