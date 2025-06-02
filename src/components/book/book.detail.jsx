import { Drawer } from "antd";

const BookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;
    
    const onClose = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    };

    return (
        <>
            <Drawer
                width={"800px"}
                title="Book Detail"
                placement="right"
                onClose={onClose}
                open={isDetailOpen}
            >
                {dataDetail ? (
                    <>
                        <p><strong>Id:</strong> {dataDetail?._id}</p>
                        <p><strong>Title:</strong> {dataDetail?.mainText}</p>
                        <p><strong>Price:</strong> {dataDetail?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        <p><strong>Quantity:</strong> {dataDetail?.quantity}</p>
                        <p><strong>Author:</strong> {dataDetail?.author}</p>
                        <p><strong>Avatar:</strong><br /></p>
                        <div style={{
                            marginTop: '10px',
                            height: '100px',
                            width: '100px',
                            border: '1px solid #ccc',
                        }}>
                            <img 
                                style={{ 
                                    height: '100%', 
                                    width: '100%', 
                                    objectFit: 'contain' 
                                }} 
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail?.thumbnail}`} 
                                alt="Thumbnail" 
                            />
                        </div>
                    </>
                ) : (
                    <p>No book details available.</p>
                )}
            </Drawer>
        </>
    );
};

export default BookDetail;
