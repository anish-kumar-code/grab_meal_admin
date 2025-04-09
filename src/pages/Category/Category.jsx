import { Breadcrumb, Button, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router';
import { FaPlus} from 'react-icons/fa';
import CategoryTable from './components/CategoryTable';
import AddCategoryModel from './components/AddCategoryModel';
import EditCategoryModel from './components/EditCategoryModel';

function Category() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showEditModal = (category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleEditOk = () => {
        setIsEditModalOpen(false);
        setSelectedCategory(null);
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedCategory(null);
    };

    const handleDelete = (category) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this category?',
            content: `This will permanently delete "${category.name}"`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No, Cancel',
            onOk() {
                // Here you would typically make an API call to delete the category
                console.log('Deleting category:', category);
            },
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
                            title: "Category",
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
                <Button
                    type='primary'
                    icon={<FaPlus />}
                    size="large"
                    className="hover:opacity-90 transition-all duration-300"
                    onClick={showModal}
                >
                    Add Category
                </Button>
            </div>
            <CategoryTable searchText={searchText} onEdit={showEditModal} onDelete={handleDelete} />

            {/* modal */}
            <AddCategoryModel
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />

            {/* edit modal */}
            <EditCategoryModel
                isModalOpen={isEditModalOpen}
                handleOk={handleEditOk}
                handleCancel={handleEditCancel}
                categoryData={selectedCategory}
            />
        </>
    )
}

export default Category
