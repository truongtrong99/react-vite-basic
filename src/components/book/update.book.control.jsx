import { Button, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { createBookAPI, updateBookAPI } from "../../services/book.api.service";
import { handleUploadFile } from "../../services/api.service";
import { useEffect, useState } from "react";

const UpdateBookControl = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, loadDataBooks, dataUpdate, setDataUpdate } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [id, setId] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            setSelectedFile(null);
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
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setDataUpdate(null);
    };

    const handleUpdateBook = async () => {
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

        const resUpdateBook = await updateBookAPI(
            id,
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
        <Modal
            title="Update Book"
            open={isModalUpdateOpen}
            onCancel={() => resetAndCloseModal()}
            onOk={handleUpdateBook}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>Title</span>
                    <Input
                        value={mainText}
                        onChange={(event) => setMainText(event.target.value)}
                    />
                </div>
                <div>
                    <span>Author</span>
                    <Input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    <span>Price</span>
                    <InputNumber
                        value={price}
                        onChange={(value) => setPrice(value)}
                        addonAfter="đ"
                        style={{ width: "100%" }}
                    />
                </div>
                <div>
                    <span>Quantity</span>
                    <InputNumber
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        style={{ width: "100%" }}
                    />
                </div>
                <div>
                    <span>Category</span>
                    <Select
                        style={{ width: "100%" }}
                        value={category}
                        onChange={(value) => setCategory(value)}
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
                </div>
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
            </div>
        </Modal>
    );
};

export default UpdateBookControl;