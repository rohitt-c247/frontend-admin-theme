import http from "@/frameworks/utils/http";
import { API_ENDPOINTS } from "@/frameworks/utils/api-endpoints";

const getAllUser = async ({ limit, sortBy, orderBy, page, search }) => {
    try {
        const response = await http.get(`${API_ENDPOINTS.USER}`, {
            params: { page, limit, sortBy, orderBy, search }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export default getAllUser;