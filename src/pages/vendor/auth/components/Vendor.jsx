import React from 'react'
import { Button, Form, Input, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function Vendor({ form }) {
    return (
        <>
            <Form.Item name="name" label="Owner Name" rules={[{ required: true, message: "Owner Name is required" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID" rules={[{ required: true, message: "User ID is required" }, { pattern: /^[a-z0-9]+$/, message: "Only lowercase letters and numbers are allowed" },]}>
                <Input onChange={(e) => form.setFieldsValue({ userId: e.target.value.toLocaleLowerCase() })} />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
                <Input.Password />
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="mobile" label="Mobile No (Whatsapp No.)" rules={[{ required: true, message: "Mobile No is required" }, { pattern: /^[6-9]\d{9}$/, message: 'Enter a valid Indian mobile number' }]}>
                        <Input type='tel' maxLength={10} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="alternateMobile" label="Alternate Mobile" rules={[{ pattern: /^[6-9]\d{9}$/, message: 'Enter a valid Indian mobile number' }]}>
                        <Input type='tel' maxLength={10} />
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="profileImg" label="Profile Image" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
                <Upload beforeUpload={() => false} listType="picture">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
        </>
    )
}

export default Vendor
