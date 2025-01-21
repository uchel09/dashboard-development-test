import { useState, useEffect } from "react";
import { IProduct } from "@/types/IProduct";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/services/product";
import toast from "react-hot-toast";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 9;
  const totalProducts = 100;
  const loadProducts = async (page = currentPage, query = searchQuery) => {
    setLoading(true);
    try {
      const data = await fetchProducts(query, page, pageSize);
      setProducts(data);
    } catch (error) {
      if (query) {
        toast("data yang anda cari tidak ada");
      }
      setProducts([]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product: IProduct) => {
    setLoading(true);
    try {
      if (products.length >= 99) {
        const oldestProduct = products.reduce((oldest, current) =>
          new Date(current.createdAt || "").getTime() <
          new Date(oldest.createdAt || "").getTime()
            ? current
            : oldest
        );

        await handleDeleteProduct(oldestProduct.id);
      }
      await addProduct(product);
      await loadProducts();
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id: string, product: IProduct) => {
    setLoading(true);
    try {
      await updateProduct(id, product);
      await loadProducts();
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id)); // Optimisasi
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  return {
    products,
    loading,
    currentPage,
    setCurrentPage,
    totalProducts,
    pageSize,
    searchQuery,
    setSearchQuery,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};
