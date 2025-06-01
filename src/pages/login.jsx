import React from 'react';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        console.log('Login Form Values:', values);
        // Here you would typically handle the login logic, e.g., calling an API
        // and redirecting the user upon successful login.
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
                                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                                        Submit
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
