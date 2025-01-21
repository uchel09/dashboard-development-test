import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface DeleteModalProps {
  content: string;
  title: string;
  onClick: (id: string) => void;
  id: string;
}

const DeleteModal = ({ content, title, id, onClick }: DeleteModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onClick(id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        style={{ backgroundColor: "red", color: "white", fontWeight: "bold" }}
        onClick={showModal}
      >
        {title}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: { backgroundColor: "#f44336", color: "white" },
        }}
        cancelButtonProps={{
          style: { backgroundColor: "white", color: "black" },
        }}
      >
        <p>{content}</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
