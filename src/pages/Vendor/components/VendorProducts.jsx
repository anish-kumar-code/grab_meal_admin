import React, { useState } from 'react';
import { Table, Card, Button, Spin, message, Input, Breadcrumb, Switch, Space } from 'antd';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import vendorProducts from '../data/vendorProducts.json';

const VendorProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [products] = useState(vendorProducts);
    const [loading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleStatusChange = async (checked, product) => {
        try {
            // TODO: Implement API call to update product status
            message.success(`Product ${checked ? 'activated' : 'deactivated'} successfully!`);
        } catch (error) {
            message.error('Failed to update product status');
        }
    };

    const handleViewDetails = (product) => {
        navigate(`/products/${product._id}`);
    };

    const columns = [
        {
            title: 'Image',
            key: 'image',
            align: "center",
            render: (_, { image }) => (
                <img
                    src={image?.[0] || 'https://via.placeholder.com/50'}
                    alt="Product"
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: "center"
        },
        {
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'subcategory',
            align: "center"
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: "center",
            render: (price) => `₹${price}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (status, record) => (
                <Switch
                    checked={status === 'active'}
                    onChange={(checked) => handleStatusChange(checked, record)}
                />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "center",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                    />
                </Space>
            )
        }
    ];

    if (loading) return <Spin size="large" fullscreen />;

    return (
        <div className="p-4">
            <div className='px-4'>
                <Breadcrumb
                    items={[
                        { title: <Link to="/">Dashboard</Link> },
                        { title: <Link to="/vendor">Vendors</Link> },
                        { title: 'Products' }
                    ]}
                />
            </div>

            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between'>
                <Input.Search
                    placeholder="Search by name or category"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ maxWidth: 300, borderRadius: '6px' }}
                    size="large"
                />
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/vendor')}
                >
                    Back to Vendors
                </Button>
            </div>

            <Card title="Vendor Products">
                <Table
                    dataSource={filteredProducts}
                    columns={columns}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default VendorProducts;
