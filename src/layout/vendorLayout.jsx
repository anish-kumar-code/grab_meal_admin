import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import VendorSidebar from '../components/VendorSidebar';
import VendorHeader from '../components/VendorHeader';
import VendorFooter from '../components/VendorFooter';

const { Content } = Layout;

const VendorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const labelMap = {
    vendor: "Dashboard",
    shop: "Shop",
    product: "Product",
  };

  const breadcrumbItems = pathSnippets.map((segment, index) => {
    const isLast = index === pathSnippets.length - 1;
    return {
      title: (
        <span
          style={{ cursor: 'pointer', color: isLast ? '#000' : '#1677ff' }}
          onClick={() => !isLast && navigate(-1)}
        >
          {labelMap[segment] || segment}
        </span>
      ),
    };
  });

  return (
    <>
    <title>Go Rabbit | Vendor Panel</title>
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
            <div className='px-4 mb-4'>
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <Outlet />
          </Content>

          <VendorFooter />
        </Layout>
      </Layout>
    </>
  );
};

export default VendorLayout;
