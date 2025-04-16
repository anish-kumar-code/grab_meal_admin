import React, { useEffect, useState } from "react";
import { Card, Descriptions, Table, Tag, Button, Spin } from "antd";
import { useParams, useNavigate } from "react-router";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getVendorDetails } from "@services/apiVendor";

const VendorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vendorData, setVendorData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const res = await getVendorDetails(id);
                setVendorData({
                    vendor: res.vendor,
                    vendorAccountDetails: res.bankDetails,
                    shopTime: res.shopTime
                })
            } catch (error) {
                message.error('Error fetching vendor details');
            }
            finally {
                setLoading(false);
            }
        }
        fetchVendorDetails()
    }, [id])

    if (loading || !vendorData) return <Spin size="large" fullscreen />;
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
                        <Descriptions.Item label="Alternate Phone">{vendor.alternate_phoneNo || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Email">{vendor.email}</Descriptions.Item>
                        {/* <Descriptions.Item label="Type">{vendor.type?.toUpperCase()}</Descriptions.Item> */}
                        <Descriptions.Item label="GST No">{vendor.gst_no || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="PAN No">{vendor.pan_no || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Services">
                            {vendor.service_id.map((s) => (
                                <Tag color="blue" key={s.name}>{s.name}</Tag>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="Food License No">{vendor.food_license_no || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Address">{vendor.address || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Approved">
                            <Tag color={vendor.isApproved ? "green" : "red"}>
                                {vendor.isApproved ? "Yes" : "No"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Blocked">
                            <Tag color={vendor.isBlock ? "red" : "green"}>
                                {vendor.isBlock ? "Yes" : "No"}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                {/* Account Info */}
                {
                    vendorData.vendorAccountDetails != null && (<Card title="Bank Account Details" bordered>
                        <Descriptions column={2}>
                            <Descriptions.Item label="Bank Name">{vendorAccountDetails.bankName || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Account No">{vendorAccountDetails.accountNo || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="IFSC">{vendorAccountDetails.ifsc || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Branch">{vendorAccountDetails.branchName || "N/A"}</Descriptions.Item>
                        </Descriptions>
                    </Card>)
                }

                <Card title="Shop Details" bordered>
                    <Descriptions column={2}>
                        <Descriptions.Item label="Like">{vendor.like}</Descriptions.Item>
                        <Descriptions.Item label="Followers">{vendor.followers}</Descriptions.Item>
                        <Descriptions.Item label="Products">{vendor.productCount}</Descriptions.Item>
                        {/* <Descriptions.Item label="Branch">{vendorAccountDetails.branchName}</Descriptions.Item> */}
                    </Descriptions>
                </Card>


                {/* Shop Timing */}
                {
                    vendorData.shopTime != null && (<Card title="Shop Schedule" bordered>
                        <Table
                            dataSource={shopTime.schedule}
                            columns={columns}
                            rowKey="_id"
                            pagination={false}
                        />
                    </Card>)
                }
            </div>
        </div>
    );
};

export default VendorDetails;
