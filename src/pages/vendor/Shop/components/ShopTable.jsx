import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Card, Spin, message, Switch, Tooltip } from 'antd';
import { getAllShop } from '@services/vendor/apiShop';
import { shopClose, shopStatus } from '../../../../services/vendor/apiShop';
import { IoStorefront } from 'react-icons/io5';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { FaEdit } from 'react-icons/fa';

function ShopTable({shops, handleEdit}) {
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Shop Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            render: (_, record) => (record.serviceId.name)
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => (record.shopType)
        },
        {
            title: 'Close',
            dataIndex: 'close',
            key: 'close',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record.isClose} onChange={(checked) => shopClose(record._id, checked)} />
            )
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            render: (products) => products ?? 0,
        },
        {
            title: 'Total Orders',
            dataIndex: 'orders',
            key: 'orders',
            render: (orders) => orders ?? 0,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (_, record) => (
                <Switch defaultChecked={record.status} onChange={(checked) => shopStatus(record._id, checked)} />
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (_, record) => (
                <Space size="small">
                    {/* <Tooltip title="Products"><Button type="primary" icon={<IoStorefront />} onClick={() => navigate(`admin/vendor/${record.shop_name}-${record._id}/products`)}></Button></Tooltip> */}
                    <Button type="primary" icon={<FaEdit />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Tooltip title="Details"><Button type="primary" icon={<IoMdEye />} onClick={() => navigate(`/admin/vendor/${record._id}`)}></Button></Tooltip>
                </Space>
            )
        }
    ];

    return (
        <Card>
            <Table
                columns={columns}
                dataSource={shops}
                rowKey="id"
                pagination={shops?.length > 10 ? { pageSize: 10 } : false}
            />
        </Card>
    );
}

export default ShopTable;
