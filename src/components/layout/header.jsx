import { Link, NavLink } from 'react-router-dom';
import './header.css';
import { Menu } from 'antd';
import { BookOutlined, HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
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