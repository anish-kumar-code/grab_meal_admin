import { Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import VendorTable from './components/VendorTable'
import { getAllVendor } from '../../../services/apiVendor'

function Vendor() {
    const [searchText, setSearchText] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const fetchVendor = async () => {
            try {
                const res = await getAllVendor()
                setDataSource(res)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchVendor()
    }, [])

    const handleDelete = (vendor) => {
        console.log(vendor)
        Modal.confirm({
            title: 'Delete Vendor',
            content: `Are you sure you want to delete "${vendor.vendorname}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                console.log('Deleting category:', vendor);
            }
        });
    };

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
            <VendorTable data={dataSource} searchText={searchText} onDelete={handleDelete} loading={loading} />
        </>
    )
}

export default Vendor
