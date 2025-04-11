import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Breadcrumb, Card, Spin, Image, Descriptions, Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { message } from 'antd';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // TODO: Replace with actual API call
                // const response = await getProductById(id);
                // setProduct(response);
                setLoading(false);
            } catch (error) {
                message.error('Failed to load product details');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return <Spin size="large" fullscreen />;

    return (
        <div className="p-4">
            <div className='px-4'>
                <Breadcrumb
                    items={[
                        { title: <Link to="/">Dashboard</Link> },
                        { title: <Link to="/vendor">Vendors</Link> },
                        { title: 'Product Details' }
                    ]}
                />
            </div>

            <div className="lg:px-10 px-5 my-8">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    className="mb-4"
                >
                    Back
                </Button>

                <Card title="Product Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Image
                                src={product?.primary_image || 'https://via.placeholder.com/400'}
                                alt="Product"
                                className="rounded-lg"
                            />
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {product?.gallery_image?.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={image}
                                        alt={`Gallery ${index + 1}`}
                                        className="rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Name">{product?.name}</Descriptions.Item>
                                <Descriptions.Item label="SKU">{product?.sku}</Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    <Tag color={product?.status === 'active' ? 'green' : 'red'}>
                                        {product?.status}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="MRP">₹{product?.mrp}</Descriptions.Item>
                                <Descriptions.Item label="Selling Price">₹{product?.sellingPrice}</Descriptions.Item>
                                <Descriptions.Item label="Discount">₹{product?.discount}</Descriptions.Item>
                                <Descriptions.Item label="Unit of Measurement">{product?.unitOfMeasurement}</Descriptions.Item>
                                <Descriptions.Item label="Selling Unit">{product?.sellingUnit}</Descriptions.Item>
                                <Descriptions.Item label="Short Description">{product?.shortDescription}</Descriptions.Item>
                                <Descriptions.Item label="Long Description">{product?.longDescription}</Descriptions.Item>
                                <Descriptions.Item label="Created At">
                                    {new Date(product?.createdAt).toLocaleDateString()}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProductDetails;