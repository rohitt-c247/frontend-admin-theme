import { API_ENDPOINTS } from "@/frameworks/utils/api-endpoints";
import http from '@/frameworks/utils/http';

//
// This service is used to add a student to the database
// Admin can add a student to the database
//
export const studentService = {
    studentRegister: async (userData) => {
        try {
            const response = await http.post(API_ENDPOINTS.STUDENT, userData);
            console.log(response, "API response"); // Log the entire response
            return response.data; // Return the entire data object
        } catch (error) {
            throw error.response ? error.response.data : new Error('Signup failed');
        }
    },
    updateStudent: async (studentId, userData) => {
        try {
            const response = await http.put(`${API_ENDPOINTS.STUDENT}/${studentId}`, userData);
            console.log(response, "API response"); // Log the entire response
            return response.data;
        } catch (error) {
            console.error('Error updating student data:', error);
            throw error;
        }
    },
    getAllStudents: async ({ limit, sortBy, orderBy, page, search }) => {
        try {
            const response = await http.get(`${API_ENDPOINTS.STUDENT}`, {
                params: { page, limit, sortBy, orderBy, search }
            });
            console.log(response, "API response"); // Log the entire response
            return response.data;
        } catch (error) {
            console.error('Error fetching student data:', error);
            throw error;
        }
    },
    getStudentById: async (studentId) => {
        try {
            const response = await http.get(`${API_ENDPOINTS.STUDENT}/${studentId}`);
            console.log(response, "API response"); // Log the entire response
            return response.data;
        } catch (error) {
            console.error('Error fetching student data:', error);
            throw error;
        }
    }
};

