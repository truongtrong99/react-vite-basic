import { Button, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { createBookAPI } from "../../services/book.api.service";
import { handleUploadFile } from "../../services/api.service";
import { useState } from "react";

const CreateBookControl = (props) => {
    const { isModalOpen, setIsModalOpen, loadDataBooks } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
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
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
    };

    const handleCreateBook = async () => {
        if (!selectedFile) message.error("Please upload a file");
        else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                const thumbnail = resUpload.data.fileUploaded;
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
                onOk={handleCreateBook}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
        </>
    );
};

export default CreateBookControl;