import { Avatar, Button, Space, Switch, Table } from 'antd'
import { FaEdit, FaTrash } from 'react-icons/fa';
import dataSource from '../data.json'

const SubCategoryTable = ({ searchText, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            align: "center",
            render: (_, { image }) => (
                <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>{image[0]}</Avatar>
            )
        },
        {
            title: 'Sub Category',
            dataIndex: 'subCategoryName',
            key: 'subCategoryName',
            align: "center"
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            align: "center"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, { name }) => (
                <Switch onChange={onChange} />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<FaEdit />} onClick={() => onEdit(record)}>Edit</Button>
                    <Button type="primary" danger icon={<FaTrash />} onClick={() => onDelete(record)}>Delete</Button>
                </Space>
            )
        }
    ];

    const onChange = checked => {
        console.log(`switch to ${checked}`);
    };

    return <Table
        dataSource={dataSource.filter(item => item.categoryName.toLowerCase().includes(searchText.toLowerCase()))}
        columns={columns}
        scroll={{ x: true }}
        bordered={false}
        size='small'
    />;
}

export default SubCategoryTable
