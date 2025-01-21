"use server";
import { IProduct } from "@/types/IProduct";
import { revalidateTag } from "next/cache";

const API_BASE_URL = "https://678dc4baa64c82aeb11dde3d.mockapi.io/commerce";

// GetAll PRoduct
export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(API_BASE_URL, {
    cache: "force-cache",
    next: { tags: ["products"] },
  });
  if (!response.ok) throw new Error("Failed to fetch products.");
  return response.json();
};

// Add Product
export const addProduct = async (product: IProduct): Promise<IProduct> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to add product.");
  await revalidateTag("products");
  return response.json();
};

//Update Product
export const updateProduct = async (
  id: string,
  product: IProduct
): Promise<IProduct> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to update product.");
  await revalidateTag("products");
  return response.json();
};

//Delete Product
export const deleteProduct = async (id: string): Promise<IProduct> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product.");
  await revalidateTag("products");
  return response.json();
};
