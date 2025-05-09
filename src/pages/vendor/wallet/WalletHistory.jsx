import React from 'react';
import { Card, Table, Tag, Typography } from 'antd';

const { Title } = Typography;

const WalletHistory = () => {
    const balance = 20000;

    const transactions = [
        {
            _id: 'txn1',
            vendor_id: 'vendor001',
            type: 'request',
            status: 'pending',
            amount: 5000,
            requestedAt: '2025-05-01T10:00:00Z',
            note: 'Requested by vendor',
        },
        {
            _id: 'txn2',
            vendor_id: 'vendor001',
            type: 'settled',
            status: 'settled',
            amount: 3000,
            requestedAt: '2025-04-25T12:00:00Z',
            settledAt: '2025-04-28T15:00:00Z',
            note: 'Settled manually by admin',
        },
        {
            _id: 'txn3',
            vendor_id: 'vendor001',
            type: 'auto-settled',
            status: 'auto-settled',
            amount: 2000,
            requestedAt: '2025-04-15T11:00:00Z',
            settledAt: '2025-04-22T11:00:00Z',
            note: 'Auto-settled after 7 days',
        },
        {
            _id: 'txn4',
            vendor_id: 'vendor001',
            type: 'request',
            status: 'rejected',
            amount: 4000,
            requestedAt: '2025-04-10T09:00:00Z',
            settledAt: '2025-04-11T10:00:00Z',
            note: 'Rejected due to invalid account info',
        },
    ];

    const columns = [
        {
            title: 'Date',
            dataIndex: 'requestedAt',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `₹${amount}`,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={
                    type === 'request' ? 'blue' :
                        type === 'settled' ? 'green' :
                            type === 'auto-settled' ? 'gold' :
                                'red'
                }>
                    {type.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'pending' ? 'orange' :
                        status === 'settled' ? 'green' :
                            status === 'auto-settled' ? 'gold' :
                                'red'
                }>
                    {status.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Settled Date',
            dataIndex: 'settledAt',
            key: 'settledAt',
            render: (date) => date ? new Date(date).toLocaleDateString() : '—',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        }
    ];

    return (
        <div className="p-4">
            <Title level={3}>Vendor Wallet History</Title>
            <Card className="mb-4">
                <Title level={5}>Current Wallet Balance: ₹{balance}</Title>
            </Card>
            <Table
                columns={columns}
                dataSource={transactions}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default WalletHistory;
