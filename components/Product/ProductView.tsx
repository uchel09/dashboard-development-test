"use client";
import React, { useState } from "react";
import { Button, Drawer, Form, Input, InputNumber, Flex } from "antd";
import { IProduct } from "@/types/IProduct";
import { useProducts } from "@/hooks/useProduct";
import ProductTable from "@/components/custom/Table/ProductTable";

const ProductView = () => {
  const {
    products,
    loading,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useProducts();
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);

  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

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

  return (
    <>
      <Flex gap="middle">
        {/* Button Add pRODUCT  */}
        <Button type="primary" onClick={() => setDrawerVisible(true)}>
          Add Product
        </Button>
        <Input.Search
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />
      </Flex>

      {/* Tabel Products  */}
      <ProductTable
        products={searchText ? filteredData : products}
        loading={loading}
        onEdit={(product) => {
          setEditingProduct(product);
          setDrawerVisible(true);
          form.setFieldsValue(product);
        }}
        onDelete={handleDeleteProduct}
      />

      {/* drawer form  */}
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

export default ProductView;
