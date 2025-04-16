import { Col, Row } from 'antd'
import React from 'react'

import AdminSlider from './components/AdminSlider'
import CategorySlider from './components/CategorySlider'
import SubCategorySlider from './components/SubCategorySlider';
import StaticsData from './components/StaticsData';

function Dashboard() {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={15}>
                    <AdminSlider />
                    <CategorySlider />
                    <SubCategorySlider />
                </Col>
                <Col xs={24} sm={24} md={9}>
                    <StaticsData />
                </Col>
            </Row>
        </>
    )
}

export default Dashboard
