import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export const getShop = async () => {
    try {
        const response = await axiosInstance.get(`/api/admin/shop/list`);
        return response.data.data;
    } catch (error) {
        message.error('Error fetching shop list');
    }
}