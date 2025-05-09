import React from 'react';
import { Table, Button, Card } from 'antd';
import { useNavigate } from 'react-router';

const ShopWallet = ({ shopWallets }) => {

    const navigate = useNavigate()

    const columns = [
        {
            title: 'Shop',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span className="flex items-center gap-2">
                    <span className="text-lg">{record.icon}</span>
                    <span>{text}</span>
                </span>
            ),
        },
        {
            title: 'Wallet Balance (₹)',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => navigate(`/vendor/wallet/${record.id}`)}>
                    View History
                </Button>
            ),
        },
    ];

    return (
        <>
            <Card>
                <h3 className="text-lg font-semibold mb-4">Shop Wallets</h3>
                <Table
                    columns={columns}
                    dataSource={shopWallets}
                    rowKey="id"
                    pagination={false}
                />
            </Card>
        </>
    );
};

export default ShopWallet;
