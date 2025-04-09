import React, { useState } from 'react'
import { Outlet } from 'react-router';

import { Button, Layout, theme } from 'antd';
const { Content } = Layout;
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
function adminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <>
            <Layout>
                <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout>
                    <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} background={colorBgContainer} />
                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: "100vh", background: colorBgContainer, borderRadius: borderRadiusLG }}>
                        <Outlet />
                    </Content>
                    <AdminFooter />
                </Layout>
            </Layout>
        </>
    )
}

export default adminLayout;
