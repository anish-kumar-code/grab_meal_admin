import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const VendorFooter = () => {
    return (
        <Footer className="text-center text-sm text-gray-400">
            Go Rabbit Vendor Panel ©{new Date().getFullYear()}
        </Footer>
    );
};

export default VendorFooter;
