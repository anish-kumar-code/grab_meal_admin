// Wallet.jsx
import React, { useState } from 'react';
import { Card, Button, message, Tag, Row, Col } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import ShopWallet from './components/ShopWallet';
import RequestModal from './components/RequestModal';
import ShopWalletHistory from './ShopWalletHistory';

const Wallet = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [selectedPercent, setSelectedPercent] = useState(null);

    const shopWallets = [
        { id: 1, name: 'Grocery Hub', icon: '🛒', balance: 12000 },
        { id: 2, name: 'Fresh Foods', icon: '🥗', balance: 18000 },
        { id: 3, name: 'Daily Mart', icon: '🏬', balance: 15000 },
    ];

    const totalBalance = shopWallets.reduce((sum, shop) => sum + shop.balance, 0);

    const handleRequestPayment = () => {
        if (!withdrawAmount || parseInt(withdrawAmount) <= 0) {
            message.error('Please enter a valid amount to withdraw');
            return;
        }

        message.success(`Payment request of ₹${withdrawAmount} raised successfully!`);

        // Reset modal state
        setModalVisible(false);
        setWithdrawAmount('');
        setSelectedPercent(null);
    };

    return (
        <div className="p-4 space-y-6">
            <Card className="rounded-2xl shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="text-lg font-semibold flex items-center gap-2">
                        <WalletOutlined className="text-blue-500 text-2xl" />
                        Total Wallet Balance: ₹{totalBalance.toLocaleString()}
                    </div>
                    <Button
                        type="primary"
                        onClick={() => setModalVisible(true)}
                        className="mt-4 sm:mt-0"
                    >
                        Request Payment
                    </Button>
                </div>
            </Card>



            <Row gutter={16} className='mt-5'>
                <Col span={18}>
                    <ShopWallet shopWallets={shopWallets} />
                </Col>
                <Col span={6}>
                    <Card
                        title="Requested Payments"
                        className="rounded-xl shadow-sm"
                        bodyStyle={{ padding: '12px' }}
                    >
                        <Card
                            className="bg-orange-50 border border-orange-200 shadow-md rounded-lg max-w-sm"
                            bodyStyle={{ padding: '10px' }}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold text-sm text-orange-800">₹10,000</div>
                                    <div className="text-xs text-orange-600">08 March 2025</div>
                                </div>
                                <Tag color="orange" className="text-[10px] font-medium px-2 py-0.5 rounded-md capitalize">
                                    Pending
                                </Tag>
                            </div>
                        </Card>
                    </Card>
                </Col>
            </Row>




            <br /><br /><br /><br /><br />

            <ShopWalletHistory/>




            <RequestModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                shopWallets={shopWallets}
                totalBalance={totalBalance}
                withdrawAmount={withdrawAmount}
                setWithdrawAmount={setWithdrawAmount}
                selectedPercent={selectedPercent}
                setSelectedPercent={setSelectedPercent}
                handleRequestPayment={handleRequestPayment}
            />
        </div>
    );
};

export default Wallet;
