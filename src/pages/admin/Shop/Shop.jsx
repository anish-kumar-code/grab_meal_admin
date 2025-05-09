import { Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import ShopTable from './components/ShopTable';
import { getShop } from '../../../services/admin/apiShop';

function Shop() {
    const [searchText, setSearchText] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null);
    const [settleAmount, setSettleAmount] = useState(0);
    const [isSettling, setIsSettling] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const fetchShop = async () => {
            try {
                const res = await getShop()
                setDataSource(res)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchShop()
    }, [])

    const handleWalletEdit = (record) => {
        setSelectedShop(record);
        setSettleAmount(record.wallet || 0);
        setIsModalVisible(true);
    };

    const handleSettleConfirm = () => {
        Modal.confirm({
            title: `Are you sure you want to settle ₹${settleAmount} for ${selectedShop?.name}?`,
            onOk: () => {
                setIsSettling(true);
                setTimeout(() => {
                    setIsSettling(false);
                    message.success('Wallet settled successfully!');
                    setIsModalVisible(false);
                }, 1500); // simulate API call
            }
        });
    };

    return (
        <>
            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between '>
                <Input.Search
                    placeholder="Search by shop name or vendor name"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        maxWidth: 300,
                        borderRadius: '6px'
                    }}
                    size="large"
                />
            </div>
            <ShopTable data={dataSource} searchText={searchText} loading={loading} handleWalletEdit={handleWalletEdit} />

            <Modal
                title={`Settle Wallet for ${selectedShop?.name}`}
                visible={isModalVisible}
                onOk={handleSettleConfirm}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={isSettling}
            >
                <p>Current Wallet: ₹{selectedShop?.wallet || 0}</p> <br />
                <p>Withdraw amount</p>
                <Input
                    type="number"
                    value={settleAmount}
                    onChange={(e) => setSettleAmount(Number(e.target.value))}
                    placeholder="Enter amount to settle"
                    min={0}
                />
            </Modal>
        </>
    )
}

export default Shop
