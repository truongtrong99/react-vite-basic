import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import {
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  LoginOutlined,
  AliwangwangOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
  const [current, setCurrent] = useState('');

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(location && location.pathname){
      const allRoutes = [ 'users', 'books'];
      const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
      if(currentRoute){
        setCurrent(currentRoute);
      } else {
        setCurrent('home');
      }
    }
  }, [location]);
  const handleLogout = async () => {
    // Perform logout logic here
    const res = await logoutAPI();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: '',
        phone: '',
        fullName: '',
        role: '',
        avatar: '',
        id: '',
      });
      message.success("Logout successfully");
      navigate("/");
    }
  };

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
    ...(!user.id ? [{
      label: <Link to={"/login"}>Đăng nhập</Link>,
      key: 'login',
      icon: <LoginOutlined />,
    }] : []),

    ...(user.id ? [{
      label: `Welcome ${user.fullName}`,
      key: 'setting',
      icon: <AliwangwangOutlined />,
      children: [
        {
          label: <span onClick={() => handleLogout()}>Logout</span>,
          key: 'logout',
        },
      ],
    }] : []),
  ];

  const onClick = e => {
    setCurrent(e.key);
  };

  return (
    <Menu 
      onClick={onClick} 
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} 
    />
  );
};

export default Header;