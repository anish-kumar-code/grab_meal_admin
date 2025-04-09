import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Button, Switch, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

// Mock data for categories, sub-categories, and vendors
// In a real application, you'd fetch this data
const categories = [{ id: 'cat1', name: 'Appetizers' }, { id: 'cat2', name: 'Main Course' }];
const subCategories = {
    cat1: [{ id: 'sub1', name: 'Soups' }, { id: 'sub2', name: 'Salads' }],
    cat2: [{ id: 'sub3', name: 'Chicken Dishes' }, { id: 'sub4', name: 'Vegetarian Dishes' }],
};
const vendors = [{ id: 'ven1', name: 'Restaurant A' }, { id: 'ven2', name: 'Restaurant B' }];


function AddFoodProductModal({ isModalOpen, handleOk, handleCancel }) {
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [fileList, setFileList] = useState([]);

    const onFinish = (values) => {
        console.log('Received values of form: ', { ...values, images: fileList });
        // Here you would typically make an API call to add the product
        form.resetFields();
        setFileList([]);
        handleOk(); // Close the modal on success
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        form.setFieldsValue({ subCategory: undefined }); // Reset sub-category when category changes
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        // Update fileList state for preview
        setFileList(e?.fileList);
        return e?.fileList;
    };

    const handleRemove = file => {
        setFileList(prevFileList => prevFileList.filter(item => item.uid !== file.uid));
        // Returning true automatically removes the file from the list
        return true;
    }

    return (
        <Modal
            title="Add New Food Product"
            open={isModalOpen}
            onOk={() => form.submit()} // Trigger form submission
            onCancel={handleCancel}
            okText="Add Product"
            cancelText="Cancel"
            width={800} // Adjust width as needed
        >
            <Form
                form={form}
                layout="vertical"
                name="add_food_product_form"
                onFinish={onFinish}
                initialValues={{
                    stock: 0,
                    dietaryPreference: 'veg', // Default value
                }}
            >
                <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Product description" />
                </Form.Item>

                <Form.Item name="vendor" label="Vendor" rules={[{ required: true, message: 'Please select a vendor!' }]}>
                    <Select placeholder="Select a vendor">
                        {vendors.map(vendor => (
                            <Option key={vendor.id} value={vendor.id}>{vendor.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
                    <Select placeholder="Select a category" onChange={handleCategoryChange}>
                        {categories.map(category => (
                            <Option key={category.id} value={category.id}>{category.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="subCategory" label="Sub-Category" rules={[{ required: true, message: 'Please select a sub-category!' }]}>
                    <Select placeholder="Select a sub-category" disabled={!selectedCategory}>
                        {selectedCategory && subCategories[selectedCategory]?.map(sub => (
                            <Option key={sub.id} value={sub.id}>{sub.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="price" label="Price (₹)" rules={[{ required: true, message: 'Please enter the price!' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/₹\s?|(,*)/g, '')} />
                </Form.Item>

                <Form.Item name="offerPrice" label="Offer Price (₹) (Optional)">
                    <InputNumber min={0} style={{ width: '100%' }} formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/₹\s?|(,*)/g, '')} />
                </Form.Item>

                <Form.Item name="stock" label="Stock Quantity" rules={[{ required: true, message: 'Please enter stock quantity!' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="dietaryPreference"
                    label="Dietary Preference"
                    rules={[{ required: true, message: 'Please select dietary preference!' }]}
                >
                    <Radio.Group>
                        <Radio value="veg">Veg</Radio>
                        <Radio value="non-veg">Non-Veg</Radio>
                        {/* Add other options like 'vegan' if needed */}
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="images"
                    label="Product Images"
                    valuePropName="fileList"
                    getValueFromEvent={normFile} // Use normFile to handle event format
                    rules={[{ required: true, message: 'Please upload at least one image!' }]}
                >
                    <Upload
                        action="/upload.do" // Replace with your actual upload endpoint or handle upload manually
                        listType="picture"
                        fileList={fileList} // Control file list externally
                        onRemove={handleRemove} // Handle file removal
                        beforeUpload={() => false} // Prevent default upload behavior, handle manually in onFinish
                        multiple
                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default AddFoodProductModal;
