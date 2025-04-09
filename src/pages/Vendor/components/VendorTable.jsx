import { Avatar, Button, Space, Spin, Switch, Table, Tag } from 'antd'
import { FaEdit, FaTrash } from 'react-icons/fa';
import dataSource from '../data.json'
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router';
import axiosInstance from '../../../utils/axiosInstance';
import { useEffect, useState } from 'react';

const VendorTable = ({ searchText, onDelete }) => {
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(dataSource)
    // Transform the data to match table structure
    // const transformedData = dataSource.map(item => ({
    //     id: item.id,
    //     vendorname: item.owner_name,
    //     shopname: item.shop_name,
    //     username: item.user_id,
    //     mobileno: item.mobile_no,
    //     email: item.email,
    //     services: item.service_id,
    //     approve: item.isApproved ? 'Yes' : 'No',
    //     block: item.isBlock ? 'Yes' : 'No',
    //     categoryName: item.type,
    //     isApproved: item.isApproved,
    //     isBlocked: item.isBlock,
    //     image: item.profileImage || item.owner_name[0]
    // }));
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/api/admin/vendor/list');
                const vendors = response.data.data.vendors;

                const transformedData = vendors.map(item => ({
                    id: item._id,
                    vendorname: item.owner_name,
                    shopname: item.shop_name,
                    username: item.user_id,
                    mobileno: item.mobile_no,
                    email: item.email,
                    services: item.service_id,
                    approve: item.isApproved ? 'Yes' : 'No',
                    block: item.isBlock ? 'Yes' : 'No',
                    categoryName: item.type,
                    isApproved: item.isApproved,
                    isBlocked: item.isBlock,
                    image: item.profileImage || item.owner_name[0]
                }));

                setDataSource(transformedData);
            } catch (error) {
                console.error('Error fetching vendor list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);

    const handleViewDetails = (record) => {
        navigate(`/vendor/${record.id}`);
    };

    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            align: "center",
            render: (_, { image }) => (
                <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>
                    {image || '?'}
                </Avatar>
            )
        },
        {
            title: 'Owner Name',
            dataIndex: 'vendorname',
            key: 'vendorname',
            align: "center"
        },
        {
            title: 'Shop Name',
            dataIndex: 'shopname',
            key: 'shopname',
            align: "center"
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            align: "center"
        },
        {
            title: 'Mobile no',
            dataIndex: 'mobileno',
            key: 'mobileno',
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
            dataIndex: 'services',
            key: 'services',
            align: "center",
            render: (services) => (
                <Space size={[0, 8]} wrap>
                    {services.map((service, index) => (
                        <Tag color="blue" key={index}>{service.name}</Tag>
                    ))}
                </Space>
            )
        },
        // {
        //     title: 'Approve',
        //     dataIndex: 'isApproved',
        //     key: 'isApproved',
        //     align: "center",
        //     render: (_, { isApproved }) => (
        //         <Switch defaultChecked={isApproved} onChange={onChange} />
        //     )
        // },
        // {
        //     title: 'Block',
        //     dataIndex: 'isBlocked',
        //     key: 'isBlocked',
        //     align: "center",
        //     render: (_, { isBlocked }) => (
        //         <Switch defaultChecked={isBlocked} onChange={onChange} />
        //     )
        // },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<IoMdEye />} onClick={() => handleViewDetails(record)}></Button>
                    {/* <Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)}>Edit</Button> */}
                    {/* <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)}></Button> */}
                </Space>
            )
        }
    ];

    const onChange = checked => {
        console.log(`switch to ${checked}`);
    };

    if (loading) return <Spin size="large" fullscreen />

    return <Table
        dataSource={dataSource.filter(item => item.vendorname.toLowerCase().includes(searchText.toLowerCase()))}
        // dataSource={transformedData}
        columns={columns}
        rowKey="id"
        scroll={{ x: true }}
        bordered={false}
        size='small'
    />;
}

export default VendorTable
