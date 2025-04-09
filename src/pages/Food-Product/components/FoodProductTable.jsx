import React from 'react'
import dataSource from "../data.json"
import { Avatar, Button, Space, Switch, Table } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';

function FoodProductTable({ searchText, onEdit, onDelete }) {

    const columns = [
        {
            title: 'Image',
            key: 'avatar',
            align: "center",
            render: (_, { image }) => (
                <Avatar size={40} style={{ backgroundColor: '#f56a00' }}>{image[0]}</Avatar>
            )
        },
        {
            title: 'Name',
            dataIndex: 'product_name',
            key: 'product_name',
            align: "center"
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: "center"
        },
        {
            title: 'Sub Category',
            dataIndex: 'subcategory',
            key: 'subcategory',
            align: "center"
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            align: "center"
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            align: "center"
        },
        {
            title: 'Price',
            dataIndex: 'original_price',
            key: 'original_price',
            align: "center"
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor_name',
            key: 'vendor_name',
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

    return (
        <>
            <Table
                dataSource={dataSource.filter(item => item.product_name.toLowerCase().includes(searchText.toLowerCase()))}
                columns={columns}
                scroll={{ x: true }}
                bordered={false}
                size='small'
            />;
        </>
    )
}

export default FoodProductTable
