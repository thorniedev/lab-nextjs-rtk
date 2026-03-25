import { Category, Product, UploadResponse } from "@/types/productType";

const baseAPI = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await fetch("/api/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const response = await data.json();
  return response;
}
export async function uploadImageToServer(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  if (!baseAPI) {
    throw new Error("NEXT_PUBLIC_API_URL is missing");
  }

  const res = await fetch(`${baseAPI}/api/v1/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
