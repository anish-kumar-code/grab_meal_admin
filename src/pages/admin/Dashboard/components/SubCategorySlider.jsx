import { RightOutlined } from '@ant-design/icons'
import { Button, Card, Carousel } from 'antd'
import React from 'react'

import cat1 from '/svgs/category1.svg'
import cat2 from '/svgs/category2.svg'
import cat3 from '/svgs/category3.svg'

function SubCategorySlider() {
    return (
        <>
            <div className='flex justify-between items-center mt-5'>
                <h3 className='sm:text-xl font-bold'>Sub Category</h3>
                <Button variant='link' color='primary' icon={<RightOutlined />} iconPosition='end'>View All</Button>
            </div>
            <div className="category-slider mt-3">
                <Carousel
                    slidesToShow={3}
                    slidesToScroll={1}
                    autoplay={{ dotDuration: true }}
                    autoplaySpeed={3000}
                    draggable={true}
                    dots={false}
                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ]}
                >
                    <div className='px-2'>
                        <Card style={{ width: "md:100px sm:200px" }}>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={cat1} alt="" />
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </Card>
                    </div>
                    <div className='px-2'>
                        <Card style={{ width: "md:100px sm:200px" }}>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={cat2} alt="" />
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </Card>
                    </div>
                    <div className='px-2'>
                        <Card style={{ width: "md:100px sm:200px" }}>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={cat3} alt="" />
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </Card>
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default SubCategorySlider
