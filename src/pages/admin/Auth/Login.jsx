import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router';

function Login() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const onFinish = async (values) => {
        console.log(values)
        setLoading(true);
        try {
            const res = await axiosInstance.post('/api/admin/login', values);
            console.log(res)
            if (res.data.status) {
                login(res.data.data.user, res.data.token);
                message.success('Login successful!');
                navigate('/');
            } else {
                message.error('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            // message.error('Something went wrong. Please try again.');
            message.error('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    // const onFinish = async (values) => {
    //     console.log(values);
    //     setLoading(true);
    //     try {
    //         const response = await fetch('http://localhost:5001/api/admin/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(values),
    //         });

    //         console.log(response)
    //         if (!response.ok) {
    //             throw new Error('Invalid credentials');
    //         }
    //         const data = await response.json();
    //         // Assuming 'login' is a function that handles user login state
    //         // login(data.data.user, data.token);
    //         message.success('Login successful!');
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         message.error('Something went wrong. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex min-h-screen">
            <title>Go Rabbit | Login</title>
            <div className="hidden md:block md:w-1/2 bg-gray-200">
                <img
                    src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Login Visual"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                            className="mb-4"
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            className="mb-6"
                        >
                            <Input.Password placeholder="********" />
                        </Form.Item>

                        <Form.Item className="mb-0">
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
