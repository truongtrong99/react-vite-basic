import { Button, Col, Divider, Form, Input, message, notification, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { loginAPI } from '../services/api.service';
import { useState,useContext } from 'react';
import { AuthContext } from '../components/context/auth.context.jsx';
const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res && res.data) {
            message.success('Login successful!');
            localStorage.setItem('access_token', res.data.access_token);
            setUser(res.data.user);
            navigate('/');
        } else {
            notification.error({
                message: 'Login Failed',
                description: JSON.stringify(res.message),
            });
        }
        setLoading(false);
    };

    return (
        <>
            <Row justify="center" style={{ marginTop: '30px' }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{ 
                        border: '1px solid #d9d9d9', 
                        padding: '15px', 
                        margin: '5px', 
                        borderRadius: '5px' 
                    }}>
                        <legend style={{ textAlign: 'left', fontSize: '24px' }}>
                            Login
                        </legend>
                        <Form
                            form={form}
                            name="basic"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Button type="primary" loading={loading} onClick={() => form.submit()}>
                                        Login
                                    </Button>
                                    <Link to="/">
                                        Go to Homepage <ArrowRightOutlined />
                                    </Link>
                                </div>
                            </Form.Item>

                            <Divider />
                            <span>{"Don't have an account?"}</span>{' '}
                            <Link to="/register">
                                <span>Register now!</span>
                            </Link>
                        </Form>
                    </fieldset>
                </Col>
            </Row>
        </>
    );
};

export default LoginPage;
