"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Button, Drawer, Form, Input, InputNumber, Space } from "antd";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { IProduct } from "@/types/IProduct";
import { useProducts } from "@/hooks/useProduct";
import ProductTable from "@/components/custom/Table/ProductTable";

const ProductView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    products,
    loading,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    pageSize,
    totalProducts,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();
  const [form] = Form.useForm();

  // Fungsi untuk menangani pencarian dan memperbarui URL
  const handleSearch = (value: string) => {
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  //submit edit dan add
  const handleSubmit = (values: IProduct) => {
    if (editingProduct) {
      handleUpdateProduct(editingProduct.id, values);
    } else {
      handleAddProduct(values);
    }
    setDrawerVisible(false);
    form.resetFields();
    setEditingProduct(null);
  };

  // Fungsi handle page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  //pantau perubahan search params
  useEffect(() => {
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    if (search) {
      setSearchQuery(search);
    }
    if (page) {
      setCurrentPage(Number(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      {/* Header Actions */}
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setDrawerVisible(true)}>
          Add Product
        </Button>
        <Input.Search
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </Space>

      {/* Products Table */}
      <ProductTable
        pageSize={pageSize}
        totalProducts={totalProducts}
        products={products}
        loading={loading}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onEdit={(product) => {
          setEditingProduct(product);
          setDrawerVisible(true);
          form.setFieldsValue(product);
        }}
        onDelete={handleDeleteProduct}
      />

      {/* Drawer Form */}
      <Drawer
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          form.resetFields();
          setEditingProduct(null);
        }}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Price is required." }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {editingProduct ? "Update" : "Add"} Product
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

const SuspenseProductView = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductView />;
    </Suspense>
  );
};
export default SuspenseProductView;
