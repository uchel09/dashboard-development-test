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
  const [loading, setLoading] = useState<boolean>(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      const sortData = data.sort((a: IProduct, b: IProduct) => {
        if (a.createdAt && b.createdAt) {
          console.log("wooy");
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      });

      console.log(sortData);
      setProducts(sortData);
    } catch (error) {
      toast.error("Failed to get products.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product: IProduct) => {
    setLoading(true);
    try {
      const response = await addProduct(product);
      console.log(response);
      // setProducts((prev) => [response, ...prev]);
      await loadProducts();
      toast.success(" Product Added Successfully");
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id: string, product: IProduct) => {
    setLoading(true);
    try {
      const response = await updateProduct(id, product);
      console.log(response);
      // setProducts((prev) =>
      //   prev.map((product) =>

      //     product.id === response.id ? { ...product, ...response } : product
      //   )
      // );
      await loadProducts();
      toast.success("Product updated successfully.");
    } catch (error) {
      toast.error("Failed to update product.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteProduct(id);
      console.log(res);
      // setProducts((prev) => prev.filter((product) => product.id !== id));
      await loadProducts();
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete product.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    console.log("di jaalankan");
  }, []);

  return {
    products,
    loading,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};
