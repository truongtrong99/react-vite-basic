import { Form, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile } from "../../services/api.service";
import { updateBookAPI } from "../../services/book.api.service";


const UpdateBookUncontrol = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, loadDataBooks, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
            if (dataUpdate && dataUpdate._id) {
                form.setFieldsValue({
                    _id: dataUpdate._id,
                    mainText: dataUpdate.mainText,
                    author: dataUpdate.author,
                    price: dataUpdate.price,
                    quantity: dataUpdate.quantity,
                    category: dataUpdate.category,
                });
                setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
            }
        }, [dataUpdate]);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setDataUpdate(null);
    };

    const handleUpdateBook = async (values) => {
        let thumbnail = null;

        if (!selectedFile && !preview) {
            message.error("Please upload a file");
            return;
        }

        if (!selectedFile && preview) {
            thumbnail = dataUpdate.thumbnail;
        }

        if (selectedFile && preview) {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                thumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error Upload File",
                    description: JSON.stringify(resUpload.message),
                });
                return;
            }
        }

        const { _id, mainText, author, price, quantity, category } = values;
        const resUpdateBook = await updateBookAPI(
            _id,
            mainText,
            author,
            price,
            quantity,
            category,
            thumbnail
        );

        if (resUpdateBook.data) {
            notification.success({
                message: "Update Book",
                description: "Book updated successfully!",
            });
            resetAndCloseModal();
            await loadDataBooks();
        } else {
            notification.error({
                message: "Error Update Book",
                description: JSON.stringify(resUpdateBook.message),
            });
        }
    };

    return (
          <>
         <Modal
                title="Update Book"
                open={isModalUpdateOpen}
                onCancel={() => resetAndCloseModal()}
                onOk={() => form.submit()}
                okText="Update"
            >
                 <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={handleUpdateBook}
            >
                <Form.Item 
                    label="ID"
                    name="_id"
                    rules={[
                        { required: true, message: 'Please input your ID!' }
                    ]}>
                    <Input disabled />
                </Form.Item>
                
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
      )
}

export default UpdateBookUncontrol;