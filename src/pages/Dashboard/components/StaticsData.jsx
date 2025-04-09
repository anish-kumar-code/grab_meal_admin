import React from 'react'
import cat1 from '/svgs/category1.svg'
import { Statistic } from 'antd';
import CountUp from 'react-countup';

const staticData = [
    { name: "Banner", image: "", count: 10, },
    { name: "Category", image: "", count: 10, },
    { name: "Sub Category", image: "", count: 30, },
    { name: "Food", image: "", count: 100, },
    { name: "Grocery", image: "", count: 200, },
    { name: "Vendor", image: "", count: 50, },
    { name: "User", image: "", count: 1500, },
];

function StaticsData() {

    const formatter = value => <CountUp end={value} separator="," />;

    return (
        <>
            <div className='flex gap-2 flex-wrap'>
                {
                    staticData.map((data) => (
                        <div className='h-[100px] w-[120px] sm:w-[220px] rounded-2xl border-1 border-zinc-200 overflow-hidden p-5 flex items-center gap-5'>
                            <img src={cat1} alt="" className='hidden sm:block' />
                            <div>
                                {/* <h1 className='text-3xl font-bold'>{data.count}</h1> */}
                                <Statistic title={data.name} value={data.count} formatter={formatter} />
                                {/* <p>{data.name}</p> */}
                            </div>
                        </div>
                    ))
                }
                {/* <div className='h-[100px] w-[220px] rounded-2xl border-1 border-zinc-200 overflow-hidden p-5 flex items-center gap-5'>
                    <img src={cat1} alt="" />
                    <div>
                        <h1 className='text-5xl font-bold'>200</h1>
                        <p>Total Orders</p>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default StaticsData
