import { Category } from '@models';
import {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  OK,
} from '@constants';
import type { UnifiedServiceResponse } from '../types/customTypes';

/**
 * Create a new category
 */
export const createCategory = async (categoryName: string, categoryType: string, status: number): Promise<UnifiedServiceResponse> => {
  const newCategory = new Category({ categoryName, categoryType, status });
  const createdCategory = await newCategory.save();
  return {
    status: CREATED,
    success: true,
    message: 'Category created successfully',
    data: createdCategory,
  };
};

/**
 * Get categories with optional filtering and pagination
 */
export const getCategory = async (
  categoryId?: string,
  page: number = 1,
  limit: number = 10,
  search?: any,
  sortBy?: any,
  orderBy?: any
): Promise<UnifiedServiceResponse> => {
  // If categoryId is provided, return that specific category
  if (categoryId) {
    const category = await Category.findById(categoryId);
    return {
      status: category ? OK : BAD_REQUEST,
      success: Boolean(category),
      message: category ? 'Category fetched successfully' : 'Category not found',
      data: category || null,
    };
  }
  
  // Otherwise, return paginated list of categories
  const query: any = {};
  
  // Add search functionality if provided
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Calculate pagination
  const skip = (page - 1) * limit;
  
  // Build sort options
  const sort: any = {};
  if (sortBy) {
    sort[sortBy] = orderBy === 'desc' ? -1 : 1;
  } else {
    sort.createdAt = -1; // Default sort by creation date, newest first
  }
  
  // Execute query with pagination
  const categories = await Category.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  
  // Get total count for pagination
  const total = await Category.countDocuments(query);
  
  return {
    status: OK,
    success: true,
    message: 'Categories fetched successfully',
    data: { 
      categories:categories,
      total: total,
    },
  };
};

/**
 * Update an existing category
 */
export const updateCategory = async (categoryId: string, categoryName: string, categoryType: string, status: number): Promise<UnifiedServiceResponse> => {
  const category = await Category.findById(categoryId);
  if (!category) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: 'Category not found',
      data: null,
    };
  }
  Object.assign(category, { categoryName, categoryType, status });
  const updatedCategory = await category.save();
  return {
    status: OK,
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  };
};

/**
 * Delete a category
 */
export const deleteCategory = async (categoryId: string): Promise<UnifiedServiceResponse> => {
  const category = await Category.findByIdAndDelete(categoryId);
  return {
    status: category ? NO_CONTENT : BAD_REQUEST,
    success: !!category,
    message: category ? 'Category deleted successfully' : 'Category not found',
    data: null,
  };
};

/**
 * Change category status
 */
export const changeStatus = async (categoryId: string, status: number): Promise<UnifiedServiceResponse> => {
  const category = await Category.findById(categoryId);
  if (!category) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: 'Category not found',
      data: null,
    };
  }
  
  category.status = status;
  await category.save();
  
  return {
    status: OK,
    success: true,
    message: 'Category status updated successfully',
    data: category,
  };
};