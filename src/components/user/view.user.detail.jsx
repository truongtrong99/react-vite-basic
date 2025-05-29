import { Drawer } from "antd";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    }
    return (
        <Drawer
            title="User Detail"
            placement="right"
            onClose={resetAndCloseModal}
            open={isDetailOpen}
            width={400}
        >
            {dataDetail ? (
                <>
                    <p><strong>Id:</strong> {dataDetail._id}</p>
                    <p><strong>Full Name:</strong> {dataDetail.fullName}</p>
                    <p><strong>Email:</strong> {dataDetail.email}</p>
                    <p><strong>Phone:</strong> {dataDetail.phone}</p>
                </>
            ) : (
                <p>No user details available.</p>
            )}
        </Drawer>
    );
}

export default ViewUserDetail;