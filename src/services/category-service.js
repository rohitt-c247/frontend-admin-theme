import { API_ENDPOINTS } from "@/frameworks/utils/api-endpoints";
import http from '@/frameworks/utils/http';

export const categoryService = {
    getAllCategory: async ({ limit, sortBy, orderBy, page, search }) => {
        try {
            const response = await http.get(`${API_ENDPOINTS.CATEGORY}`, {
                params: { page, limit, sortBy, orderBy, search }
            });
            console.log(response, "resposnse of service file"); // Log the entire response
            return response;
        } catch (error) {
            console.error('Error fetching student data:', error);
            throw error;
        }
    }
}