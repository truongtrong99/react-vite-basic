import { Button, Modal, notification } from "antd";
import Input from "antd/es/input/Input";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        if(res.data){
            notification.success({ message:"Create User", description: 'User created successfully!' });
            setIsModalOpen(false);
        }else{
            notification.error({ message:"Error Create User", description: JSON.stringify(res.message) })
        }
    }
    
    return (
        <div className="user-form" style={{ margin: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h3>Table Users</h3>
                <Button type="primary" onClick={()=> setIsModalOpen(true)}>Create User</Button>
            </div>

            <Modal title="Create User" 
                open={isModalOpen} 
                onOk={handleSubmitBtn} 
                onCancel={() => setIsModalOpen(false)} 
                maskClosable={false} 
                okText="CREATE"
                cancelText="Cancel">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <span>Full Name</span>
                            <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        <div>
                            <span>Email</span>
                            <Input value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div>
                            <span>Password</span>
                            <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div>
                            <span>Phone number</span>
                            <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                       
                    </div>
            </Modal>

        </div>
    )
}

export default UserForm;