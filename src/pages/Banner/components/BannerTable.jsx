import { Button, Space, Switch, Table } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BannerTable = ({ searchText, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Image',
            key: 'image',
            align: "center",
            render: (_, { image }) => (
                <img
                    src={image}
                    alt="banner"
                    style={{
                        width: 100,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: '4px'
                    }}
                />
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            align: "center"
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            align: "center"
        },
        {
            title: 'Section',
            dataIndex: 'section',
            key: 'section',
            align: "center"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, { status }) => (
                <Switch
                    checked={status === 'active'}
                    onChange={(checked) => {
                        console.log(`switch to ${checked}`);
                        // Here you would typically make an API call to update the status
                    }}
                />
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

    // This would typically come from an API or state management
    const dataSource = [
        {
            id: 1,
            image: 'https://example.com/banner1.jpg',
            title: 'Summer Sale',
            service: 'Food',
            section: 'Offer',
            status: 'active'
        },
        // Add more banner data as needed
    ];

    return (
        <Table
            dataSource={dataSource.filter(item =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
            )}
            columns={columns}
            scroll={{ x: true }}
            bordered={false}
            size='small'
            className="lg:px-10 px-5"
        />
    );
};

export default BannerTable; 