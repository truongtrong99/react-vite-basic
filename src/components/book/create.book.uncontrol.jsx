import { Form } from "antd";
import { useState } from "react";
import { Button, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { handleUploadFile } from "../../services/api.service";
import { createBookAPI } from "../../services/book.api.service";

const CreateBookUncontrol = (props) => {
    const [form] = Form.useForm();
    const { isModalOpen, setIsModalOpen, loadDataBooks } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
    };

    const handleCreateBook = async () => {
        if (!selectedFile) message.error("Please upload a file");
        else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                const thumbnail = resUpload.data.fileUploaded;
                const { mainText, author, price, quantity, category } = form.getFieldsValue();
                const resCreateBook = await createBookAPI(
                    mainText,
                    author,
                    price,
                    quantity,
                    category,
                    thumbnail
                );
                if (resCreateBook.data) {
                    notification.success({
                        message: "Create Book",
                        description: "Book created successfully!",
                    });
                    resetAndCloseModal();
                    await loadDataBooks();
                } else {
                    notification.error({
                        message: "Error Create Book",
                        description: JSON.stringify(resCreateBook.message),
                    });
                }
            } else {
                notification.error({
                    message: "Error Upload File",
                    description: JSON.stringify(resUpload.message),
                });
            }
        }
    };

    return (
        <>
         <Modal
                title="Create Book"
                open={isModalOpen}
                onCancel={() => resetAndCloseModal()}
                onOk={() => form.submit()}
            >
                 <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={handleCreateBook}
            >
                <Form.Item
                    label="Title"
                    name="mainText"
                    rules={[
                        { required: true, message: 'Please input your title!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="author"
                    rules={[
                        { required: true, message: 'Please input your author!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input your price!' },
                    ]}
                >
                    <InputNumber
                        addonAfter="đ"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        { required: true, message: 'Please input your quantity!' },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        { required: true, message: 'Please input your category!' },
                    ]}
                >
                    <Select
                        style={{ width: "100%" }}
                        options={[
                            { value: "Arts", label: "Arts" },
                            { value: "Business", label: "Business" },
                            { value: "Comics", label: "Comics" },
                            { value: "Cooking", label: "Cooking" },
                            { value: "Entertainment", label: "Entertainment" },
                            { value: "History", label: "History" },
                            { value: "Music", label: "Music" },
                            { value: "Sports", label: "Sports" },
                            { value: "Teen", label: "Teen" },
                            { value: "Travel", label: "Travel" },
                        ]}
                    />
                </Form.Item>

                <div>
                    <label
                        htmlFor="btnUpload"
                        style={{
                            display: "inline-block",
                            padding: "6px 12px",
                            cursor: "pointer",
                            backgroundColor: "#1890ff",
                            color: "#fff",
                            borderRadius: "4px",
                            marginTop: "10px",
                            width: "fit-content",
                        }}
                    >
                        Upload
                    </label>
                    <input
                        type="file"
                        id="btnUpload"
                        hidden
                        onChange={handleOnChangeFile}
                        onClick={(event) => {
                            event.target.value = null;
                        }}
                        style={{ display: "none" }}
                    />
                </div>

                {preview && (
                    <div
                        style={{
                            marginTop: "10px",
                            height: "100px",
                            width: "100px",
                            marginBottom: "10px",
                        }}
                    >
                        <img
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={preview}
                            alt="Preview"
                        />
                    </div>
                )}
            </Form>
            </Modal>
           
        </>
    );
};

export default CreateBookUncontrol;
