import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, message, Upload, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function EditSubCategoryModel({ isModalOpen, handleOk, handleCancel, categoryData }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (categoryData) {
            form.setFieldsValue({
                categoryName: categoryData.categoryName,
                subcategoryName: categoryData.subCategoryName
            });
            if (categoryData.image) {
                setFileList([{
                    uid: '-1',
                    name: 'image',
                    status: 'done',
                    url: categoryData.image
                }]);
            }
        }
    }, [categoryData, form]);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
            return false;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Image must be smaller than 10MB!');
            return false;
        }
        return false;
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            // TODO: Add your API call here
            message.success('Sub Category updated successfully!');
            form.resetFields();
            setFileList([]);
            handleOk();
        } catch (error) {
            message.error('Failed to update sub category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit Sub Category"
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleCancel}
            confirmLoading={loading}
            okText="Update Sub Category"
        >
            <Form
                form={form}
                layout="vertical"
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Category Name"
                    name="categoryName"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a category"
                        optionFilterProp="label"
                        options={[
                            { value: 'electronics', label: 'Electronics' },
                            { value: 'clothing', label: 'Clothing' },
                            { value: 'books', label: 'Books' },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Sub Category Name"
                    name="subcategoryName"
                    rules={[{ required: true, message: 'Please enter sub category name!' }]}
                >
                    <Input placeholder='Enter Sub Category Name' />
                </Form.Item>

                <Form.Item label="Sub Category Image" name="image">
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        fileList={fileList}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditSubCategoryModel
