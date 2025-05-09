import React from 'react';
import { Card, Switch, Table, Tag } from 'antd';

const ShopWalletHistory = () => {

    const shop = {
        name: 'Anish Shop',
        service: 'food',
        type: 'veg',
        products: 15,
        orders: 0,
        wallet: 2200,
        status: true,
    };

    const summary = {
        totalOrderAmount: 2500,
        totalCommission: 500,
        extraPayments: 100,
        finalWalletBalance: 2100 + 100, // 2600
    };

    const transactions = [
        {
            key: '1',
            date: '01-May-2025',
            type: 'Order Payment',
            orderId: 'ORD123',
            amount: 1000,
            commission: 200,
            extra: 0,
            final: 800,
        },
        {
            key: '2',
            date: '05-May-2025',
            type: 'Admin Bonus',
            orderId: '-',
            amount: 0,
            commission: 0,
            extra: 100,
            final: 100,
        },
        {
            key: '3',
            date: '08-May-2025',
            type: 'Order Payment',
            orderId: 'ORD124',
            amount: 1500,
            commission: 300,
            extra: 0,
            final: 1200,
        },
    ];

    const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Type', dataIndex: 'type', key: 'type',
            render: (type) => (
                <Tag color={type === 'Order Payment' ? 'blue' : 'green'}>{type}</Tag>
            )
        },
        { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
        { title: 'Order Amount', dataIndex: 'amount', key: 'amount', render: amt => `₹${amt}` },
        { title: 'Commission', dataIndex: 'commission', key: 'commission', render: amt => `₹${amt}` },
        { title: 'Extra', dataIndex: 'extra', key: 'extra', render: amt => `₹${amt}` },
        { title: 'Final', dataIndex: 'final', key: 'final', render: amt => <strong>₹{amt}</strong> },
    ];

    return (
        <div className="p-4 mx-auto space-y-6">

            {/* shop details card */}
            <div>
                <Card title="Shop Details" className="bg-gray-50 border border-gray-200 shadow rounded-xl mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                            <div className="text-gray-600">Shop Name</div>
                            <div className="font-semibold text-blue-600">{shop.name}</div>
                        </div>
                        <div>
                            <div className="text-gray-600">Service</div>
                            <div className="capitalize">{shop.service}</div>
                        </div>
                        <div>
                            <div className="text-gray-600">Type</div>
                            <Tag color={shop.type === 'veg' ? 'green' : 'volcano'}>{shop.type}</Tag>
                        </div>
                        <div>
                            <div className="text-gray-600">Products</div>
                            <Tag color="green">{shop.products}</Tag>
                        </div>
                        <div>
                            <div className="text-gray-600">Today Orders</div>
                            <div>{shop.orders}</div>
                        </div>
                        <div>
                            <div className="text-gray-600">Wallet Balance</div>
                            <div className="font-semibold text-gray-800">₹{shop.wallet}</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Summary Card */}
            <Card
                title="Shop Wallet Summary"
                className="bg-gray-50 border border-gray-200 shadow rounded-xl"
            >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                        <div className="text-gray-600">Total Orders Amount</div>
                        <div className="font-semibold text-blue-600">₹{summary.totalOrderAmount}</div>
                    </div>
                    <div>
                        <div className="text-gray-600">Total Commission</div>
                        <div className="font-semibold text-red-500">₹{summary.totalCommission}</div>
                    </div>
                    <div>
                        <div className="text-gray-600">Extra Payments</div>
                        <div className="font-semibold text-green-600">₹{summary.extraPayments}</div>
                    </div>
                    <div>
                        <div className="text-gray-600">Final Wallet Balance</div>
                        <div className="font-bold text-gray-800 text-lg">₹{summary.finalWalletBalance}</div>
                    </div>
                </div>
            </Card>

            {/* Transaction History Table */}
            <div className='mt-5'>
                <Card title="Wallet Transaction History">
                    <Table
                        dataSource={transactions}
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                        bordered
                        rowKey="key"
                        size="middle"
                    />
                </Card>
            </div>
        </div>
    );
};

export default ShopWalletHistory;
