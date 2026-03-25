import { ProductRequest, ProductResponse } from "@/types/productType";
import { fakeStoreApi } from "../api/api";

type UpdateProductArg = {
  id: string | number;
  data: ProductRequest;
};

type DeleteProductArg = string | number;

export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => `/api/product`,
      providesTags: ["Products"],
    }),
    getProductById: builder.query<ProductResponse, string | number>({
      query: (id) => `/api/product/${id}`,
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation<ProductResponse, ProductRequest>({
      query: (newProduct) => ({
        url: "/api/product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<ProductResponse, UpdateProductArg>({
      query: ({ id, data }) => ({
        url: `/api/product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, DeleteProductArg>({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
