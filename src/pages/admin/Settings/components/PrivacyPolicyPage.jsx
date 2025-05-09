import { Breadcrumb, Button, Form, message, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { getAllSettings, updateSettings } from '../../../../services/apiSettings';

function PrivacyPolicyPage() {
    const [privacyPolicy, setPrivacyPolicy] = useState("")
    const [data, setdata] = useState("")
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);

    const fetchSetting = async () => {
        try {
            const data = await getAllSettings();
            // console.log(data.data.settings[0].termAndConditions)
            setPrivacyPolicy(data.data.settings[0].privacyPolicy)
            setdata(data.data.settings[0])
        } catch (error) {
            message.error("Failed to load settings.");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchSetting() }, [])

    const onFinish = async() => {
        setUpdateLoading(true)
        const fromData = {
            privacyPolicy : privacyPolicy
        }

        try {
            const res = await updateSettings(data._id,fromData)
            message.success('Privacy policy updated');
        } catch (error) {
            message.error('Error updating privacy policy');
        }finally{
            setUpdateLoading(false)
        }
    };

    if (loading) return <Spin size="large" fullscreen />;
    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <TextArea autoSize={{minRows:20}} placeholder="Enter Privacy Policy here ..." value={privacyPolicy} onChange={(e)=> setPrivacyPolicy(e.target.value)} required/>

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

export default PrivacyPolicyPage

