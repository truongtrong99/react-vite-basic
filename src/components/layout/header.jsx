import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { BookOutlined, HomeOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
const items = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={"/users"}>Users</Link>,
    key: 'users',
    icon: <UsergroupAddOutlined />,
  },
  {
    label: <Link to={"/books"}>Books</Link>,
    key: 'books',
    icon: <BookOutlined />,
  },
  {
    label:'Setting',
    key: 'setting',
    icon: <SettingOutlined />,
    children: [
      {
        label: <Link to={"/login"}>Login</Link>,
        key: 'login',
      },
      {
        label:'Logout',
        key: 'logout',
      }
    ]
  }
];
const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default Header;