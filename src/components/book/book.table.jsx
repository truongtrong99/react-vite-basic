import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { useState } from "react";
import BookDetail from "./book.detail";
import { handleUploadFile } from "../../services/api.service";
import { createBookAPI } from "../../services/book.api.service";
import CreateBookControl from "./create.book.control";
import CreateBookUncontrol from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";

const BookTable = (props) => {
  const {
    dataBooks,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    total,
    loadDataBooks,
  } = props;
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
const [dataUpdate, setDataUpdate] = useState(null);
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }

    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => (
        <>{(index + 1) + (current - 1) * pageSize}</>
      ),
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataDetail(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "mainText",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => {
        return (
          <span>
            {value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />

          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            // onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

 
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <h2>Book Table</h2>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          CREATE
        </Button>
      </div>

      <Table
        dataSource={dataBooks}
        columns={columns}
        rowKey="_id"
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

      <BookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />

      {/* <CreateBookControl  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} loadDataBooks={loadDataBooks} /> */}
      <CreateBookUncontrol isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} loadDataBooks={loadDataBooks} />
      <UpdateBookControl isModalUpdateOpen={isModalUpdateOpen} setIsModalUpdateOpen={setIsModalUpdateOpen} loadDataBooks={loadDataBooks} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
    </>
  );
};

export default BookTable;