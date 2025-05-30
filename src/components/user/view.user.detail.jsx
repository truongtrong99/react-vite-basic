import { Button, Drawer } from "antd";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    }
    return (
        <Drawer
            width={"800px"}
            title="User Detail"
            placement="right"
            onClose={resetAndCloseModal}
            open={isDetailOpen}
        >
            {dataDetail ? (
                <>
                    <p><strong>Id:</strong> {dataDetail._id}</p>
                    <p><strong>Full Name:</strong> {dataDetail.fullName}</p>
                    <p><strong>Email:</strong> {dataDetail.email}</p>
                    <p><strong>Phone:</strong> {dataDetail.phone}</p>
                    <div>
                        <strong>Avatar:</strong><br />
                        <img 
                            height={100} width={100}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="Avatar" />
                    </div>
                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: 'inline-block',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            backgroundColor: '#1890ff',
                            color: '#fff',
                            borderRadius: '4px',
                            marginTop: '10px',
                            width: 'fit-content'
                        }}>Upload Avatar</label>
                        <input type="file" id="btnUpload" hidden />
                    </div>
                    {/* <Button type="primary">Upload Avatar</Button> */}
                </>
            ) : (
                <p>No user details available.</p>
            )}
        </Drawer>
    );
}

export default ViewUserDetail;