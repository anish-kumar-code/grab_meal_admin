import { Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import OrderTable from './components/OrderTable'
import { getAllOrder } from '../../../services/vendor/apiOrder'

function Order() {
    const [searchText, setSearchText] = useState('');
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(()=> {fetchOrderList()},[]);

    const fetchOrderList = async () => {
        setLoading(true)
        try {
            const res = await getAllOrder()
            setOrders(res.orders)
        } catch (error) {
            message.error("something went wrong")
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between '>
                <Input.Search
                    placeholder="Search by name"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        maxWidth: 300,
                        borderRadius: '6px'
                    }}
                    size="large"
                />
            </div>
            <OrderTable searchText={searchText} loading={loading} data={orders}/>
        </>
    )
}

export default Order
