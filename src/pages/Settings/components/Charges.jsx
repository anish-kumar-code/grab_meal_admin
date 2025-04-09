import React, { useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, message, Breadcrumb } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

function Charges() {
    const [form] = Form.useForm();
    const [logoFile, setLogoFile] = useState(null);

    const onFinish = (values) => {
        console.log('Form values:', values);
        // Here you would typically make an API call to save these settings
        message.success('Settings updated successfully!');
    };

    const handleLogoChange = (info) => {
        if (info.file.status === 'done') {
            setLogoFile(info.file);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <>
            <div className='px-4'>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={'/'}>Dashboard</Link>,
                        },
                        {
                            title: "Settings",
                        },
                        {
                            title: "Site Settings",
                        }
                    ]}
                />
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Manage Settings</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="max-w-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Item
                            label="Brand Name"
                            name="brandName"
                            rules={[{ required: true, message: 'Please enter brand name' }]}
                        >
                            <Input placeholder="Enter brand name" size='large' />
                        </Form.Item>

                        <Form.Item
                            label="Logo"
                            name="logo"
                        >
                            <Upload
                                name="logo"
                                listType="picture"
                                maxCount={1}
                                onChange={handleLogoChange}
                            >
                                <Button icon={<UploadOutlined />}>Upload Logo</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Food Tax (%)"
                            name="foodTax"
                            rules={[{ required: true, message: 'Please enter food tax' }]}
                        >
                            <InputNumber
                                min={0}
                                max={100}
                                style={{ width: '100%' }}
                                placeholder="Enter food tax percentage"
                                size='large'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Grocery Tax (%)"
                            name="groceryTax"
                            rules={[{ required: true, message: 'Please enter grocery tax' }]}
                        >
                            <InputNumber
                                min={0}
                                max={100}
                                style={{ width: '100%' }}
                                placeholder="Enter grocery tax percentage"
                                size='large'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Shipping Charge"
                            name="shippingCharge"
                            rules={[{ required: true, message: 'Please enter shipping charge' }]}
                        >
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                placeholder="Enter shipping charge"
                                size='large'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Extra Charge"
                            name="extraCharge"
                            rules={[{ required: true, message: 'Please enter extra charge' }]}
                        >
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                placeholder="Enter extra charge"
                                size='large'
                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Charges;
