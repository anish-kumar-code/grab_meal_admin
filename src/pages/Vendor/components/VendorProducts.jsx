import React, { useEffect, useState } from 'react';
import { Table, Card, Button, Spin, message, Input, Breadcrumb, Switch, Space } from 'antd';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { getVendorProduct } from '../../../services/apiVendor';
import { updateProductStatus } from '../../../services/apiProduct';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorProducts = () => {
    const {vendorSlug} = useParams()
    const id = vendorSlug.split('-').pop();
    const shopName = vendorSlug.replace(`-${id}`, '')
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.categoryId.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const fetchVendorProduct = async () => {
        try {
            const res = await getVendorProduct(id);
            setProducts(res)
        } catch (error) {
            message.error('Error fetching vendor product');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVendorProduct()
    }, [])

    const columns = [
        {
            title: 'Image',
            key: 'image',
            align: "center",
            render: (_, { primary_image }) => (
                <img
                    src={`${BASE_URL}/${primary_image}` || '?'}
                    alt="Product"
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                    loading='lazy'
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
            align: "center",
            render: (_, record) => (<>{record.categoryId.name}</>)
        },
        {
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'subcategory',
            align: "center",
            render: (_, record) => (<>{record.subCategoryId.name}</>)
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: "center",
            render: (_, record) => (<>₹{record.sellingPrice} <del>{record.mrp}</del></>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, record) => (
                <Switch
                    defaultChecked={record?.status === "active"}
                    onChange={(checked) => updateProductStatus(record._id, checked)}
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
                        onClick={() => navigate(`/products/${shopName}-${record.name}-${record._id}`)}
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
                        { title: shopName }
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

            <Card title={`${shopName} Products`}>
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
