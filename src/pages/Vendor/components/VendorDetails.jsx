import React, { useEffect, useState } from "react";
import { Card, Descriptions, Table, Tag, Button, Spin } from "antd";
import { useParams, useNavigate } from "react-router";
import dataSource from '../data.json';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosInstance from "../../../utils/axiosInstance";

const VendorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vendorData, setVendorData] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const vendor = dataSource.find(item => item.vendor._id === id);
    //     if (vendor) {
    //         setVendorData(vendor);
    //     }
    // }, [id]);

    // if (!vendorData) {
    //     return <div>Loading...</div>;
    // }
    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const response = await axiosInstance.get("/api/admin/vendor/list");
                const vendors = response.data.data.vendors;
                const matchedVendor = vendors.find(v => v._id === id);
                if (matchedVendor) {
                    setVendorData({
                        vendor: matchedVendor,
                        vendorAccountDetails: matchedVendor.bank_details || {},
                        shopTime: matchedVendor.shopTime || { schedule: [] }
                    });
                }
            } catch (error) {
                console.error("Error fetching vendor details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVendor();
    }, [id]);
    if (loading || !vendorData) return <Spin size="large" fullscreen/>;
    const { vendor, vendorAccountDetails, shopTime } = vendorData;

    const columns = [
        {
            title: "Day",
            dataIndex: "day",
            key: "day",
        },
        {
            title: "Open Time",
            dataIndex: "openTime",
            key: "openTime",
        },
        {
            title: "Close Time",
            dataIndex: "closeTime",
            key: "closeTime",
        },
        {
            title: "Closed",
            dataIndex: "isClosed",
            key: "isClosed",
            render: (isClosed) => (
                <Tag color={isClosed ? "red" : "green"}>{isClosed ? "Yes" : "No"}</Tag>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/vendor')}
                className="mb-4"
            >
                Back to Vendors
            </Button>
            <div className="grid gap-6">
                {/* Vendor Info */}
                <Card title="Vendor Information" bordered>
                    <Descriptions column={2}>
                        <Descriptions.Item label="Owner Name">{vendor.owner_name}</Descriptions.Item>
                        <Descriptions.Item label="Shop Name">{vendor.shop_name}</Descriptions.Item>
                        <Descriptions.Item label="Mobile No">{vendor.mobile_no}</Descriptions.Item>
                        <Descriptions.Item label="Alternate Phone">{vendor.alternate_phoneNo}</Descriptions.Item>
                        <Descriptions.Item label="Email">{vendor.email}</Descriptions.Item>
                        <Descriptions.Item label="Type">{vendor.type?.toUpperCase()}</Descriptions.Item>
                        <Descriptions.Item label="GST No">{vendor.gst_no || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="PAN No">{vendor.pan_no || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Services">
                            {vendor.service_id.map((s) => (
                                <Tag color="blue" key={s.name}>{s.name}</Tag>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="Food License No">{vendor.food_license_no || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Address">{vendor.address || "N/A"}</Descriptions.Item>
                        {/* <Descriptions.Item label="Approved">
                            <Tag color={vendor.isApproved ? "green" : "red"}>
                                {vendor.isApproved ? "Yes" : "No"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Blocked">
                            <Tag color={vendor.isBlock ? "red" : "green"}>
                                {vendor.isBlock ? "Yes" : "No"}
                            </Tag>
                        </Descriptions.Item> */}
                    </Descriptions>
                </Card>

                {/* Account Info */}
                {/* <Card title="Bank Account Details" bordered>
                    <Descriptions column={2}>
                        <Descriptions.Item label="Bank Name">{vendorAccountDetails.bankName}</Descriptions.Item>
                        <Descriptions.Item label="Account No">{vendorAccountDetails.accountNo}</Descriptions.Item>
                        <Descriptions.Item label="IFSC">{vendorAccountDetails.ifsc}</Descriptions.Item>
                        <Descriptions.Item label="Branch">{vendorAccountDetails.branchName}</Descriptions.Item>
                    </Descriptions>
                </Card> */}

                {/* Shop Timing */}
                {/* <Card title="Shop Schedule" bordered>
                    <Table
                        dataSource={shopTime.schedule}
                        columns={columns}
                        rowKey="_id"
                        pagination={false}
                    />
                </Card> */}
            </div>
        </div>
    );
};

export default VendorDetails;
