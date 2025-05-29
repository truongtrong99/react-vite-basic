import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {
    const [id, setId] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if(dataUpdate){
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone)
        if(res.data){
            notification.success({ message:"Update User", description: 'User updated successfully!' });
            resetAndCloseModal();
            await loadUser();
        }else{
            notification.error({ message:"Error Update User", description: JSON.stringify(res.message) })
        }
    }
    
    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName('');
        setPhone('');
        setId('');
        setDataUpdate(null);
    }

    return (
         <Modal title="Update User" 
                open={isModalUpdateOpen} 
                onOk={handleSubmitBtn} 
                onCancel={() => resetAndCloseModal()} 
                maskClosable={false} 
                okText="SAVE"
                cancelText="Cancel">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <span>Id</span>
                            <Input value={id} disabled />
                        </div>
                        <div>
                            <span>Full Name</span>
                            <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        <div>
                            <span>Phone number</span>
                            <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                       
                    </div>
            </Modal>
    )
}

export default UpdateUserModal;