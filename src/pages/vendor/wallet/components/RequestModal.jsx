import React from 'react';
import { Modal, Select, Button, Input, message } from 'antd';

const { Option } = Select;

const RequestModal = ({
    modalVisible,
    setModalVisible,
    shopWallets,
    totalBalance,
    selectedShop,
    setSelectedShop,
    withdrawAmount,
    setWithdrawAmount,
    selectedPercent,
    setSelectedPercent,
    handleRequestPayment,
}) => {
    const handlePercentageClick = (percent) => {
        const selectedBalance = shopWallets.reduce((sum, shop) => sum + shop.balance, 0);
        const amount = Math.floor((selectedBalance * percent) / 100);
        setWithdrawAmount(amount.toString());
        setSelectedPercent(percent);
    };

    const selectedBalance = shopWallets.reduce((sum, shop) => sum + shop.balance, 0);

    return (
        <Modal
            title="Request Payment"
            open={modalVisible}
            onOk={handleRequestPayment}
            onCancel={() => {
                setModalVisible(false);
                setWithdrawAmount('');
                setSelectedPercent(null);
            }}
            okText="Raise Request"
        >
            <p className="font-medium text-base">Total Wallet Balance: ₹{totalBalance}</p>

            <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                    {[10, 25, 50].map((percent) => (
                        <Button
                            key={percent}
                            type={selectedPercent === percent ? 'primary' : 'default'}
                            onClick={() => handlePercentageClick(percent)}
                        >
                            {percent}%
                        </Button>
                    ))}
                </div>

                <Input
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => {
                        setWithdrawAmount(e.target.value);
                        setSelectedPercent(null);
                    }}
                    className="w-full"
                />

                {withdrawAmount && (
                    <div className="text-gray-600 text-sm">
                        Remaining Balance: ₹{selectedBalance - parseInt(withdrawAmount || 0)}
                    </div>
                )}

                <div className="text-yellow-600 text-sm mt-2">
                    ⚠️ You can withdraw payment only one time in a week.
                </div>
                <div className="text-blue-600 text-sm">
                    ⏳ Your payment will be cleared after 7 days.
                </div>
            </div>
        </Modal>
    );
};

export default RequestModal;
