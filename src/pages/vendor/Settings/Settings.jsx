import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form, Input, Button, Upload, message, Avatar, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getVendorProfile, updateProfileInfo } from '../../../services/vendor/apiAuth';
import { useWatch } from 'antd/es/form/Form';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const { TabPane } = Tabs;

const VendorProfile = () => {
    const [form] = Form.useForm();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch vendor profile
        const fetchVendor = async () => {
            try {
                const res = await getVendorProfile()
                const vendorData = res.data.vendor;
                setVendor(res.data.vendor);
                // form.setFieldsValue(res.data.vendor);
                form.setFieldsValue({
                    name: vendorData.name || '',
                    userId: vendorData.userId || '',
                    mobile: vendorData.mobile || '',
                    alternateMobile: vendorData.alternateMobile || '',
                    email: vendorData.email || '',
                    panNo: vendorData.panNo || '',
                    gstNo: vendorData.gstNo || '',
                    foodLicense: vendorData.foodLicense || '',
                    ifsc: vendorData.ifsc === 'undefined' ? '' : vendorData.ifsc,
                    bankName: vendorData.bankName === 'undefined' ? '' : vendorData.bankName,
                    branchName: vendorData.branchName === 'undefined' ? '' : vendorData.branchName,
                    accountNo: vendorData.accountNo === 'undefined' ? '' : vendorData.accountNo,
                    passbook: vendorData.passbook,
                    commission: vendorData.commission ?? '',
                });
            } catch (err) {
                message.error('Failed to load vendor profile');
            } finally {
                setLoading(false)
            }
        };

        fetchVendor();
    }, [form]);

    const onFinish = async (values) => {
        try {
            await axios.put('/api/vendor/profile', values);
            message.success('Profile updated successfully');
        } catch (err) {
            message.error('Failed to update profile');
        }
    };

    const updateProfile = async (values) => {
        try {
            const res = await updateProfileInfo(values)
            message.success(res.message)
        } catch (error) {
            message.error('Failed to update profile');
        }
    }

    const ifsc = useWatch('ifsc', form);

    useEffect(() => {
        const fetchIFSCDetails = async () => {
            if (ifsc && /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
                try {
                    const res = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
                    const data = await res.json();
                    if (data.BANK && data.BRANCH) {
                        form.setFieldsValue({
                            bankName: data.BANK,
                            branchName: data.BRANCH,
                        });
                    } else {
                        throw new Error();
                    }
                } catch {
                    message.error('Invalid IFSC code');
                    form.setFieldsValue({
                        bankName: '',
                        branchName: '',
                    });
                }
            }
        };

        fetchIFSCDetails();
    }, [ifsc, form]);

    const updateBankAccountDetails = async(values)=>{
        try {
            console.log(values)
        } catch (error) {
            message.error('Failed to update bank details');
        }
    }

    if (loading) return <Spin size="large" fullscreen />;

    return (
        <>
            <div className="min-h-screen">
                <div className="p-6">
                    {/* <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Vendor Profile</h2>
                    </div> */}
                    <Tabs defaultActiveKey="1">
                        {/* Profile Info */}
                        <TabPane tab="Profile Info" key="1">
                            <div className="flex gap-6 items-center mb-6">
                                <Avatar size={96} src={`${BASE_URL}/${vendor.profileImg}`} />
                                <div>
                                    <h2 className="text-xl font-semibold">{vendor.name}</h2>
                                    <p className="text-gray-600">{vendor.email}</p>
                                </div>
                            </div>
                            <Form form={form} layout="vertical" onFinish={updateProfile}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item label="Name" name="name">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="User ID" name="userId">
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item label="Mobile Number" name="mobile">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Alternate Mobile" name="alternateMobile">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email">
                                        <Input />
                                    </Form.Item>
                                </div>
                                <Button type="primary" htmlType="submit">Update Profile</Button>
                            </Form>
                        </TabPane>

                        {/* Account Details */}
                        <TabPane tab="Account Details" key="2">
                            <Form form={form} layout="vertical" onFinish={updateBankAccountDetails}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item label="Bank Name" name="bankName">
                                        <Input variant='filled' />
                                    </Form.Item>
                                    <Form.Item label="IFSC Code" name="ifsc" rules={[{ pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Please enter a valid IFSC code' }]}>
                                        <Input onChange={(e) => { form.setFieldsValue({ ifsc: e.target.value.toUpperCase() }); }} />
                                    </Form.Item>
                                    <Form.Item label="Branch Name" name="branchName">
                                        <Input variant='filled' />
                                    </Form.Item>
                                    <Form.Item label="Account Number" name="accountNo" rules={[{ pattern: /^[0-9]{9,18}$/, message: "Enter a valid account number" },]}>
                                        <Input />
                                    </Form.Item>
                                </div>
                                <Form.Item label="Passbook Image">
                                    <Upload maxCount={1} beforeUpload={() => false}>
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                </Form.Item>
                                <Button type="primary" htmlType="submit">Update Bank Details</Button>
                            </Form>
                        </TabPane>

                        {/* Documents */}
                        <TabPane tab="Documents" key="3">
                            <Form layout="vertical">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item label="PAN Number" name="panNo">
                                        <Input defaultValue={vendor.panNo} disabled />
                                    </Form.Item>
                                    <Form.Item label="GST Number" name="gstNo">
                                        <Input defaultValue={vendor.gstNo} disabled />
                                    </Form.Item>
                                    <Form.Item label="Food License" name="foodLicense">
                                        <Input defaultValue={vendor.foodLicense} disabled />
                                    </Form.Item>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <label className="block mb-1">PAN Image</label>
                                        <img src={`${BASE_URL}/${vendor.panImage}`} alt="PAN" className="rounded shadow" />
                                    </div>
                                    <div>
                                        <label className="block mb-1">GST Image</label>
                                        <img src={`${BASE_URL}/${vendor.gstImage}`} alt="GST" className="rounded shadow" />
                                    </div>
                                    <div>
                                        <label className="block mb-1">Food License Image</label>
                                        <img src={`${BASE_URL}/${vendor.foodImage}`} alt="Food License" className="rounded shadow" />
                                    </div>
                                </div>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>


    );
};

export default VendorProfile;