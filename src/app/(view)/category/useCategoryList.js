'use client'

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { categoryService } from "@/services/category-service";    

const useCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [paginationParams, setPaginationParams] = useState({
        page: 1,
        limit: 10,
        total: 0
    });
    const router = useRouter();

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

    const handleDelete = async (categoryId) => {
        setDeleteLoading(true);
        setDeletingId(categoryId);
    
        try {
            const formattedCategoryId = String(categoryId).trim();
            console.log("Deleting Category ID:", formattedCategoryId);
    
            const res = await categoryService.deleteCategory(formattedCategoryId);
    
            if (!res || res.status) {
                toast.success("Category deleted successfully");
                fetchCategories();
            } else if (res.success) {
                toast.success(res.message || "Category deleted successfully");
                fetchCategories();
            } else {
                toast.error(res?.message || "Failed to delete category");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred while deleting the category");
        } finally {
            setDeleteLoading(false);
            setDeletingId(null);
        }
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
        handleDelete,
        deleteLoading,
        deletingId
    };
};

export default useCategoryList;