'use client'; // Add this at the top of page.jsx

import React from 'react';
import CategoryListView from './categoryListView';
import useCategoryList from './useCategoryList';

const CategoryPage = () => {
    const { categories, loading, error, paginationParams, handlePageChange, handleLimitChange } = useCategoryList();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <CategoryListView 
            categories={categories} 
            loading={loading}
            paginationParams={paginationParams}
            handlePageChange={handlePageChange}
            handleLimitChange={handleLimitChange}
        />
    );
};

export default CategoryPage;