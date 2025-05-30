import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { Popconfirm } from 'antd';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
const { dataUsers, loadUser } = props;
const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
const [dataUpdate, setDataUpdate] = useState(null);

const [dataDetail, setDataDetail] = useState(null);
const [isDetailOpen, setIsDetailOpen] = useState(false);

const handleDeleteUser = async (_id) => {
  const res = await deleteUserAPI(_id)
  if(res.data){
    notification.success({ message:"Delete User", description: 'User deleted successfully!' });
    await loadUser();
  }else{
    notification.error({ message:"Error Delete User", description: JSON.stringify(res.message) })
  }
}

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    render: (_, record) =>{
      return (
        <a href='#' onClick={() => {
          setDataDetail(record);
          setIsDetailOpen(true);
        }}>{record._id}</a>
      )
    },
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div style={{ display: 'flex', gap: '20px' }}>
        <EditOutlined 
          onClick={() => {
            setDataUpdate(record);
            setIsModalUpdateOpen(true);
          }}
          style={{ cursor:'pointer', color:'orange'}}/>

          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement='left'
          >
            <DeleteOutlined style={{ cursor:'pointer', color:'red'}}/>
          </Popconfirm>
      </div>
    ),
  },
];

    return (
       <>
         <Table columns={columns} dataSource={dataUsers} rowKey="_id"/>
         <UpdateUserModal 
            isModalUpdateOpen={isModalUpdateOpen} 
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate} 
            loadUser={loadUser}
         />

         <ViewUserDetail 
            isDetailOpen={isDetailOpen} 
            setIsDetailOpen={setIsDetailOpen}
            dataDetail={dataDetail}
            setDataDetail={setDataDetail}
         />
        
       </>
    )
}

export default UserTable;