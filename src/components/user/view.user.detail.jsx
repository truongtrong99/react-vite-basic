import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    }
    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, 'avatar');
        if(resUpload.data) {
            notification.success({ message: "Upload File", description: 'File uploaded successfully!' });
            const avatar = resUpload.data.fileUploaded;
            //step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(avatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            if(resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({ message: "Update User Avatar", description: 'User avatar updated successfully!' });
            }else {
                notification.error({ message: "Error Update User Avatar", description: JSON.stringify(resUpdateAvatar.message) });
            }
            return;
        }else {
            notification.error({ message: "Error Upload File", description: JSON.stringify(resUpload.message) });
            return;
        }
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
                    <p><strong>Avatar:</strong><br /></p>
                    <div style={{
                        marginTop: '10px',
                        height: '100px',
                        width: '100px',
                        border: '1px solid #ccc',
                    }}>
                        <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} 
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
                        <input type="file" id="btnUpload" hidden 
                        onChange={handleOnChangeFile}/>
                    </div>
                    {preview && (
                       <>
                           <div style={{
                               marginTop: '10px',
                               height: '100px',
                               width: '100px',
                               marginBottom: '10px',
                           }}>
                               <img style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                   src={preview} alt="Preview" />
                           </div>
                            <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
                                Save
                            </Button>
                       </>
                    )}
                </>
            ) : (
                <p>No user details available.</p>
            )}
        </Drawer>
    );
}

export default ViewUserDetail;