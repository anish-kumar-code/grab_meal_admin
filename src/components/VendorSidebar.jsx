import React from 'react';
import { Layout, Avatar, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUser, FaRegFileAlt, FaStore } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';


const { Sider } = Layout;

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    // backgroundColor: "#00806A",
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable'
};

function VendorSidebar({ collapsed }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { vendorLogout } = useAuth();
    const currentPath = location.pathname.replace('/vendor/', '') || 'dashboard';

    const menuItems = [
        {
            key: 'dashboard',
            icon: <LuLayoutDashboard style={{ fontSize: "18px" }} />,
            label: 'Dashboard',
            onClick: () => navigate('/vendor'),
        },
        {
            key: 'shops',
            icon: <FaStore style={{ fontSize: "18px" }} />,
            label: 'My Shops',
            onClick: () => navigate('/vendor/shop'),
        },
        {
            key: 'profile',
            icon: <FaRegUser style={{ fontSize: "18px" }} />,
            label: 'Profile',
            onClick: () => navigate('/vendor/profile'),
        },
        // {
        //     key: 'documents',
        //     icon: <FaRegFileAlt style={{ fontSize: "18px" }} />,
        //     label: 'Documents',
        //     onClick: () => navigate('/vendor/documents'),
        // },
        {
            type: 'divider',
        },
        {
            key: 'settings',
            icon: <IoSettingsOutline style={{ fontSize: "18px" }} />,
            label: 'Settings',
            onClick: () => navigate('/vendor/settings'),
        },
        {
            key: 'logout',
            icon: <MdLogout style={{ fontSize: "18px" }} />,
            label: 'Logout',
            onClick: () => {
                vendorLogout()
                navigate('/vendor/login');
            },
        },
    ];

    return (
        <Sider
            width={210}
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={siderStyle}
        // className="bg-[#001529]"
        >
            <div className="flex items-center gap-3 my-3 mx-2 p-3 bg-zinc-600 rounded-md">
                <Avatar
                    size={collapsed ? 32 : 64}
                    src={<img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="avatar" />}
                />
                {!collapsed && <h3 className="text-white font-semibold">Vendor</h3>}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[currentPath]}
                items={menuItems}
                onClick={(e) => {
                    const clickedItem = menuItems.find(
                        item => item.key === e.key || (item.children || []).some(child => child.key === e.key)
                    );
                    if (clickedItem?.onClick) clickedItem.onClick();
                }}
                style={{ fontSize: "15px" }}
            />
        </Sider>
    );
}

export default VendorSidebar;
