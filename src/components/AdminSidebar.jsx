import React, { useEffect, useState } from 'react'
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

    const pathSnippets = location.pathname.split('/').slice(2);
    const selectedKey = pathSnippets[pathSnippets.length - 1] || 'dashboard';
    const openKey = pathSnippets.length > 1 ? pathSnippets[0] : '';
    const [openKeys, setOpenKeys] = useState(openKey ? [openKey] : []);

    useEffect(() => {
        setOpenKeys(openKey ? [openKey] : []);
    }, [openKey]);

    const menuItems = [
        { key: 'dashboard', icon: <LuLayoutDashboard />, label: 'Dashboard', onClick: () => navigate('/admin') },
        { key: 'banner', icon: <IoImagesOutline />, label: 'Banner', onClick: () => navigate('/admin/banner') },
        { key: 'category', icon: <TbCategory2 />, label: 'Category', onClick: () => navigate('/admin/category') },
        { key: 'sub-category', icon: <MdOutlineCategory />, label: 'Sub Category', onClick: () => navigate('/admin/sub-category') },
        { key: 'product/food', icon: <IoFastFoodOutline />, label: 'Product', onClick: () => navigate('/admin/product') },
        // { key: 'product/grocery', icon: <GrBasket />, label: 'Grocery Product', onClick: () => navigate('/admin/product/grocery') },
        { type: 'divider' },
        { key: 'vendor', icon: <LuUsers />, label: 'Vendor', onClick: () => navigate('/admin/vendor') },
        { key: 'user', icon: <FaRegUser />, label: 'User', onClick: () => navigate('/admin/user') },
        {
            key: 'settings',
            icon: <IoSettingsOutline />,
            label: 'Settings',
            children: [
                { key: 'profile', label: 'Profile', onClick: () => navigate('/admin/settings/profile') },
                { key: 'charges', label: 'Site', onClick: () => navigate('/admin/settings/charges') },
                { key: 'terms-and-conditions', label: 'Terms & Conditions', onClick: () => navigate('/admin/settings/terms-and-conditions') },
                { key: 'privacy-policy', label: 'Privacy Policy', onClick: () => navigate('/admin/settings/privacy-policy') },
                { key: 'refund-policy', label: 'Refund Policy', onClick: () => navigate('/admin/settings/refund-policy') },
            ]
        }
    ];

    return (
        <Sider
            width={210}
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={siderStyle}
        >
            <div className="demo-logo-vertical" />
            <div className="flex items-center gap-3 my-2 mx-1 p-3 bg-zinc-600 rounded-md">
                <Avatar
                    size={collapsed ? 32 : 64}
                    src={<img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="avatar" />}
                />
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={(keys) => setOpenKeys(keys)}
                items={menuItems}
                style={{ fontSize: 15 }}
            />
        </Sider>
    )
}

export default AdminSidebar
