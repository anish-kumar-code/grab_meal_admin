import { Avatar, Button, Space, Switch, Table, Tag } from 'antd'
import { FaEdit, FaTrash } from 'react-icons/fa';
import dataSource from '../data.json'
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router';

const UserTable = ({ searchText, onDelete }) => {
    const navigate = useNavigate();

    // Transform the data to match table structure
    const transformedData = dataSource.map(item => ({
        id: item.username,
        name: item.name,
        email: item.email,
        phone: item.phone,
        image: item.image,
        status: item.status
    }));

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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: "center"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: "center"
        },
        {
            title: 'Mobile no',
            dataIndex: 'phone',
            key: 'phone',
            align: "center"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: "center"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, { status }) => (
                <Switch defaultChecked={status} onChange={onChange} />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    {/* <Button type="primary" icon={<IoMdEye />} onClick={() => handleViewDetails(record)}></Button> */}
                    {/* <Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)}>Edit</Button> */}
                    <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)}></Button>
                </Space>
            )
        }
    ];

    const onChange = checked => {
        console.log(`switch to ${checked}`);
    };

    return <Table
        dataSource={transformedData.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
        // dataSource={transformedData}
        columns={columns}
        rowKey="id"
        scroll={{ x: true }}
        bordered={false}
        size='small'
    />;
}

export default UserTable
