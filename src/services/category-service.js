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
    },

    getCategoryById: async (categoryId) => {
        try {
            const response = await http.get(`${API_ENDPOINTS.CATEGORY}/${categoryId}`);
            console.log(response, "API response"); // Log the entire response
            return response.data;
        } catch (error) {
            console.error("Error fetching category data:", error);
            throw error;
        }
    },
    
    createCategory: async (categoryData) => {
        try {
            const response = await http.post(API_ENDPOINTS.CATEGORY, categoryData);
            console.log(response, "API response"); // Log the entire response
            return response.data; // Return the entire data object
        } catch (error) {
            throw error.response ? error.response.data : new Error('Create category failed');
        }
    },

    updateCategory: async (categoryId, categoryData) => {
        try {
            const response = await http.put(`${API_ENDPOINTS.CATEGORY}/${categoryId}`, categoryData);
            console.log(response, "API response"); // Log the entire response
            return response.data; // Return the entire data object
        } catch (error) {
            throw error.response ? error.response.data : new Error('Update category failed');
        }
    },

    deleteCategory: async (categoryId, ) => {
        try {
            const response = await http.delete(`${API_ENDPOINTS.CATEGORY}/${categoryId}`, );
            console.log(response, "API response"); // Log the entire response
            return response.data; // Return the entire data object
        } catch (error) {
            throw error.response ? error.response.data : new Error('Delete category failed');
        }
    },

}