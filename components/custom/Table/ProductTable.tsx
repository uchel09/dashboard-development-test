import React, { useState } from "react";
import { Table, Button } from "antd";
import { IProduct } from "@/types/IProduct";
import { EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../modals/DeleteModal";
import { useSearchParams } from "next/navigation"; // Import untuk mengakses searchParams

interface ProductTableProps {
  products: IProduct[];
  loading: boolean;
  onEdit: (product: IProduct) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onEdit,
  onDelete,
}) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState<number>(page);

  // fungsi untuk menangani perubahan halaman dan memperbarui searchParams
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    window.history.pushState({}, "", "?" + newParams.toString());
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text.slice(0, 30) + "...",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: IProduct) => (
        <>
          <Button
            style={{
              marginRight: "10px",
              marginBottom: "10px",
              backgroundColor: "#f9e213",
              fontWeight: "bold",
            }}
            onClick={() => onEdit(record)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <DeleteModal
            content="Apakah Anda Yakin menghapus product ini?"
            title="Delete"
            onClick={onDelete}
            id={record.id}
          />
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: 9,
        onChange: handlePageChange,
      }}
    />
  );
};

export default ProductTable;
