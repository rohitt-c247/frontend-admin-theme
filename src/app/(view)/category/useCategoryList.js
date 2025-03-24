'use client'

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { categoryService } from "@/services/category-service";    

const useCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationParams, setPaginationParams] = useState({
        page: 1,
        limit: 10,
        total: 0
    });

    useEffect(() => {
        fetchCategories();
    }, [paginationParams.page, paginationParams.limit]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { page, limit } = paginationParams;
            const response = await categoryService.getAllCategory({ page, limit });
            console.log(response.data, "API response"); 
            if (!response.data.success) {
                throw new Error('Network response was not ok');
            }
            const data = await response.data.data;
            setCategories(data.categories || []);
            setPaginationParams(prev => ({
                ...prev,
                total: data.total || 0
            }));
        } catch (error) {
            setError(error);
            console.error(error,"error arhi he");
            toast.error(error.message || "An error occurred while fetching categories");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPaginationParams(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const handleLimitChange = (newLimit) => {
        setPaginationParams(prev => ({
            ...prev,
            limit: newLimit,
            page: 1 // Reset to first page when changing limit
        }));
    };

    const handleEdit = (categoryId) => {
        router.push(`/category/${categoryId}/edit`);
      };

    const handleView = (categoryId) => {
    router.push(`/category/${categoryId}`);
    };

    return { 
        categories, 
        loading, 
        error, 
        paginationParams, 
        handlePageChange, 
        handleLimitChange,
        handleEdit,
        handleView,
    };
};

export default useCategoryList;
