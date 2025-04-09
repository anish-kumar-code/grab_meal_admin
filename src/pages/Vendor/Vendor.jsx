import { Breadcrumb, Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router'
import VendorTable from '../Vendor/components/VendorTable'
import AddSubCategoryModel from '../SubCategory/components/AddSubCategoryModel'
import EditSubCategoryModel from '../SubCategory/components/EditSubCategoryModel'

function Vendor() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    // const showEditModal = (category) => {
    //     setSelectedCategory(category);
    //     setIsEditModalOpen(true);
    // };

    // const handleEditOk = () => {
    //     setIsEditModalOpen(false);
    //     setSelectedCategory(null);
    // };

    // const handleEditCancel = () => {
    //     setIsEditModalOpen(false);
    //     setSelectedCategory(null);
    // };

    const handleDelete = (vendor) => {
        console.log(vendor)
        Modal.confirm({
            title: 'Delete Vendor',
            content: `Are you sure you want to delete "${vendor.vendorname}"?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                console.log('Deleting category:', vendor);
            }
        });
    };

    return (
        <>
            <div className='px-4'>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={'/'}>Dashboard</Link>,
                        },
                        {
                            title: "vendors",
                        }
                    ]}
                />
            </div>
            <div className='lg:px-10 px-5 my-8 md:flex items-center gap-4 justify-between '>
                <Input.Search
                    placeholder="Search by name"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        maxWidth: 300,
                        borderRadius: '6px'
                    }}
                    size="large"
                />
                {/* <Button
                    type='primary'
                    icon={<FaPlus />}
                    size="large"
                    className="hover:opacity-90 transition-all duration-300"
                    onClick={showModal}
                >
                    Add Sub Category
                </Button> */}
            </div>
            <VendorTable searchText={searchText} onDelete={handleDelete} />

            {/* modal */}
            {/* <AddSubCategoryModel
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            /> */}

            {/* edit modal */}
            {/* <EditSubCategoryModel
                isModalOpen={isEditModalOpen}
                handleOk={handleEditOk}
                handleCancel={handleEditCancel}
                categoryData={selectedCategory}
            /> */}
        </>
    )
}

export default Vendor
