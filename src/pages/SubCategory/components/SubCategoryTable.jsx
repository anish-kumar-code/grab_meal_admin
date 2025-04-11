import { Avatar, Button, Space, Switch, Table } from 'antd'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateStatus } from '../../../services/apiCategory';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SubCategoryTable = ({ searchText, data, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Image',
            key: 'avatar',
            align: "center",
            render: (_, { image }) => (
                <Avatar size={60} style={{ backgroundColor: '#fff' , boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}}>{image ? <img src={`${BASE_URL}/${image}`} /> : "?"}</Avatar>
            )
        },
        {
            title: 'Sub Category',
            dataIndex: 'name',
            key: 'names',
            align: "center"
        },
        {
            title: 'Category',
            key: 'cat_id',
            align: "center",
            render: (_, record) => record.cat_id?.name || "N/A"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record?.status === "active"} onChange={(checked) => updateStatus(record._id, checked)} />
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

    const filtredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))

    return <Table
        dataSource={filtredData}
        columns={columns}
        rowKey={"_id"}
        scroll={{ x: true }}
        bordered={false}
        size='small'
    />;
}

export default SubCategoryTable
