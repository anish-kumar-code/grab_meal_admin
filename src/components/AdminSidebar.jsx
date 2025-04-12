import React, { useState } from 'react'
import { Avatar, Layout, Menu } from 'antd'
const { Sider } = Layout

import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { TbCategory2 } from 'react-icons/tb';
import { MdOutlineCategory } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router';
import { FaRegUser } from 'react-icons/fa';
import { IoFastFoodOutline, IoImagesOutline, IoSettingsOutline } from 'react-icons/io5';
import { GrBasket } from 'react-icons/gr';

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable'
};

function AdminSidebar({ collapsed }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Get the current path without the leading slash
    const currentPath = location.pathname.replace('/', '') || 'dashboard';

    const menuItems = [
        {
            key: 'dashboard',
            icon: <LuLayoutDashboard style={{ fontSize: "18px" }} />,
            label: 'Dashboard',
            onClick: () => navigate('/'),
        },
        {
            key: 'banner',
            icon: <IoImagesOutline style={{ fontSize: "18px" }} />,
            label: 'Banner',
            onClick: () => navigate('/banner'),
        },
        {
            key: 'category',
            icon: <TbCategory2 style={{ fontSize: "18px" }} />,
            label: 'Category',
            onClick: () => navigate('/category'),
        },
        {
            key: 'sub-category',
            icon: <MdOutlineCategory style={{ fontSize: "18px" }} />,
            label: 'Sub Category',
            onClick: () => navigate('/sub-category'),
        },
        {
            key: 'product/food',
            icon: <IoFastFoodOutline style={{ fontSize: "18px" }} />,
            label: 'Food Product',
            onClick: () => navigate('/product/food'),
        },
        {
            key: 'product/grocery',
            icon: <GrBasket style={{ fontSize: "18px" }} />,
            label: 'Grocery Product',
            onClick: () => navigate('/product/grocery'),
        },
        {
            type: 'divider',
        },
        {
            key: 'vendor',
            icon: <LuUsers style={{ fontSize: "18px" }} />,
            label: 'Vendor',
            onClick: () => navigate('/vendor'),
        },
        {
            key: 'user',
            icon: <FaRegUser style={{ fontSize: "18px" }} />,
            label: 'User',
            onClick: () => navigate('/user'),
        },
        {
            key: 'settings',
            icon: <IoSettingsOutline style={{ fontSize: "18px" }} />,
            label: 'Settings',
            onClick: () => navigate('/settings'),
        }
    ]

    return (
        <>
            <Sider width={210} trigger={null} collapsible collapsed={collapsed} style={siderStyle}>
                <div className="demo-logo-vertical" />
                <div className='flex items-center gap-3 my-2 mx-1 p-3 bg-zinc-600 rounded-md'>
                    <Avatar size={collapsed ? 32 : 64} src={<img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="avatar" />} />
                    {/* {!collapsed && <h3 className='text-white'>Anish</h3>} */}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[currentPath]}
                    items={menuItems}
                    onClick={(e) => {
                        const clickedItem = menuItems.find(item => item.key === e.key || (item.children || []).some(child => child.key === e.key))
                        if (clickedItem?.onClick) clickedItem.onClick()
                    }}
                    style={{ fontSize: "15px" }}
                />
            </Sider>
        </>
    )
}

export default AdminSidebar
