import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router';
import VendorSidebar from '../components/VendorSidebar';
import VendorHeader from '../components/VendorHeader';
import VendorFooter from '../components/VendorFooter';

const { Content } = Layout;

const VendorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <VendorSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <VendorHeader collapsed={collapsed} setCollapsed={setCollapsed} background={colorBgContainer} />

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>

        <VendorFooter />
      </Layout>
    </Layout>
  );
};

export default VendorLayout;
