import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Dashboard Overview</h2>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Card bordered className="shadow-md rounded-xl">
                        <Statistic
                            title="Total Orders"
                            value={120}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card bordered className="shadow-md rounded-xl">
                        <Statistic
                            title="Total Revenue"
                            value={23450}
                            prefix={<DollarOutlined />}
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card bordered className="shadow-md rounded-xl">
                        <Statistic
                            title="Customers"
                            value={48}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
