import { API_ENDPOINTS } from "@/frameworks/utils/api-endpoints";
import http from '@/frameworks/utils/http';

const signupService = {
    signup: async (userData) => {
        try {
            const response = await http.post(API_ENDPOINTS.SIGNUP, userData);
            console.log(response, "API response"); // Log the entire response
            return response.data; // Return the entire data object
        } catch (error) {
            throw error.response ? error.response.data : new Error('Signup failed');
        }
    }
};

export default signupService;