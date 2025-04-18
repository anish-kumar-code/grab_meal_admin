import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerVendor = async (formData) => {
    const response = await axios.post(`${BASE_URL}/api/vendor/register`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return response.data;
}

