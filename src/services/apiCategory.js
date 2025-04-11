import { message } from "antd";
import axiosInstance from "../utils/axiosInstance";

export const getAllCategory = async () => {
    try {
        const response = await axiosInstance.get('/api/admin/category/list')
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        message.error('Error fetching category list');
    }
}

export const addCategory = async (formData) => {
    try {
        const response = await axiosInstance.post('/api/admin/category/create', formData, { headers: { "Content-Type": "multipart/form-data" } });
        // console.log(response)
        return response;
    } catch (error) {
        message.error('Error adding category');
    }
}

export const updateStatus = async(id,status)=>{
    status = status ? "active" : "inactive"
    try {
        const response = await axiosInstance.patch(`/api/admin/category/${id}`, {status});
        message.success('category status update');
        return response;
    } catch (error) {
        message.error('Error updating category status');
    }
}