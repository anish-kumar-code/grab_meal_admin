import { Breadcrumb, Button, Form, message, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { getAllSettings, updateSettings } from '../../../../services/apiSettings';

function RefundPolicy() {
    const [refundPolicy, setRefundPolicy] = useState("")
    const [data, setdata] = useState("")
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);

    const fetchSetting = async () => {
        try {
            const data = await getAllSettings();
            setRefundPolicy(data.data.settings[0].refundPolicy)
            setdata(data.data.settings[0])
        } catch (error) {
            message.error("Failed to load settings.");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchSetting() }, [])

    const onFinish = async () => {
        setUpdateLoading(true)
        const fromData = {
            refundPolicy: refundPolicy
        }

        try {
            const res = await updateSettings(data._id, fromData)
            message.success('Refund policy updated');
        } catch (error) {
            message.error('Error updating refund policy');
        }finally{
            setUpdateLoading(false)
        }
    };

    if (loading) return <Spin size="large" fullscreen />;
    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Refund Policy</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <TextArea autoSize={{minRows:20}} placeholder="Enter Refund Policy here ..." value={refundPolicy} onChange={(e) => setRefundPolicy(e.target.value)} required />

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" className='mt-4' loading={updateLoading}>
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default RefundPolicy


