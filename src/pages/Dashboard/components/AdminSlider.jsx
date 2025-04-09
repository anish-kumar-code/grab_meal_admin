import { Carousel } from 'antd'
import React from 'react'

function AdminSlider() {
    return (
        <>
            {/* hero slider */}
            <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={3000} draggable={true}>
                <div> <img src="https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-1.jpg" alt="" loading='lazy'/> </div>
                <div><img src="https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-3.jpg" alt="" loading='lazy'/> </div>
                <div><img src="https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-4.jpg" alt="" loading='lazy'/></div>
            </Carousel>
        </>
    )
}

export default AdminSlider
