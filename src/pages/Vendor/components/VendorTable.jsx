import { Avatar, Button, Space, Spin, Switch, Table, Tag } from 'antd'
import { FaTrash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getAllVendor, vendorApprove, vendorBlock } from '../../../services/apiVendor';
import { FaUserTie } from 'react-icons/fa6';
import { Tooltip } from 'antd';
import { IoStorefront } from 'react-icons/io5';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorTable = ({ searchText, onDelete }) => {
    const navigate = useNavigate();
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

    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            align: "center",
            render: (_, { profileImage, owner_name }) => (
                <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>
                    {/* {image || '?'} */}
                    {profileImage ? <img src={`${BASE_URL}/${profileImage}`} alt={owner_name} /> : <FaUserTie />}
                </Avatar>
            )
        },
        {
            title: 'Owner Name',
            dataIndex: 'owner_name',
            key: 'owner_name',
            align: "center"
        },
        {
            title: 'Shop Name',
            dataIndex: 'shop_name',
            key: 'shop_name',
            align: "center"
        },
        {
            title: 'User Name',
            dataIndex: 'user_id',
            key: 'user_id',
            align: "center"
        },
        {
            title: 'Mobile no',
            dataIndex: 'mobile_no',
            key: 'mobile_no',
            align: "center"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: "center"
        },
        {
            title: 'Services',
            dataIndex: 'service_id',
            key: 'service_id',
            align: "center",
            render: (services) => (
                <Space size={[0, 8]} wrap>
                    {services.map((service, index) => (
                        <Tag color="blue" key={index}>{service.name}</Tag>
                    ))}
                </Space>
            )
        },
        {
            title: 'Approve',
            dataIndex: 'isApproved',
            key: 'isApproved',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record.isApproved} onChange={(checked) => vendorApprove(record._id, checked)} />
            )
        },
        {
            title: 'Block',
            dataIndex: 'isBlock',
            key: 'isBlock',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record.isBlock} onChange={(checked) => vendorBlock(record._id, checked)} />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Products"><Button type="primary" icon={<IoStorefront />} onClick={() => navigate(`/vendor/${record.shop_name}-${record._id}/products`)}></Button></Tooltip>
                    <Tooltip title="Details"><Button type="primary" icon={<IoMdEye />} onClick={() => navigate(`/vendor/${record._id}`)}></Button></Tooltip>
                </Space>
            )
        }
    ];

    const filtredData = dataSource.filter(item => item.owner_name?.toLowerCase().includes(searchText.toLowerCase()))

    if (loading) return <Spin size="large" fullscreen />

    return <Table
        dataSource={filtredData}
        columns={columns}
        rowKey="_id"
        scroll={{ x: true }}
        bordered={false}
        size='small'
    />;
}

export default VendorTable
