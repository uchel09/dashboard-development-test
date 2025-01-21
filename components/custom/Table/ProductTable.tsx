import React from "react";
import { Table, Button } from "antd";
import { IProduct } from "@/types/IProduct";
import { EditOutlined } from "@ant-design/icons";
import DeleteModal from "../../modals/DeleteModal";

interface ProductTable2Props {
  products: IProduct[];
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEdit: (product: IProduct) => void;
  onDelete: (id: string) => void;
  pageSize: number;
  totalProducts: number;
}

const ProductTable2: React.FC<ProductTable2Props> = ({
  products,
  loading,
  currentPage,
  onPageChange,
  onEdit,
  onDelete,
  pageSize,
  totalProducts,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
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
        pageSize: pageSize,
        onChange: handlePageChange,
        total: totalProducts,
      }}
    />
  );
};

export default ProductTable2;
