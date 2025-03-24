"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
const _models_1 = require("@models");
const _constants_1 = require("@constants");
/**
 * Create a new category
 */
const createCategory = (categoryName, categoryType, status) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = new _models_1.Category({ categoryName, categoryType, status });
    const createdCategory = yield newCategory.save();
    return {
        status: _constants_1.CREATED,
        success: true,
        message: 'Category created successfully',
        data: createdCategory,
    };
});
exports.createCategory = createCategory;
/**
 * Get categories with optional filtering and pagination
 */
const getCategory = (categoryId_1, ...args_1) => __awaiter(void 0, [categoryId_1, ...args_1], void 0, function* (categoryId, page = 1, limit = 10, search, sortBy, orderBy) {
    // If categoryId is provided, return that specific category
    if (categoryId) {
        const category = yield _models_1.Category.findById(categoryId);
        return {
            status: category ? _constants_1.OK : _constants_1.BAD_REQUEST,
            success: Boolean(category),
            message: category ? 'Category fetched successfully' : 'Category not found',
            data: category || null,
        };
    }
    // Otherwise, return paginated list of categories
    const query = {};
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
    const sort = {};
    if (sortBy) {
        sort[sortBy] = orderBy === 'desc' ? -1 : 1;
    }
    else {
        sort.createdAt = -1; // Default sort by creation date, newest first
    }
    // Execute query with pagination
    const categories = yield _models_1.Category.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    // Get total count for pagination
    const total = yield _models_1.Category.countDocuments(query);
    return {
        status: _constants_1.OK,
        success: true,
        message: 'Categories fetched successfully',
        data: {
            categories: categories,
            total: total,
        },
    };
});
exports.getCategory = getCategory;
/**
 * Update an existing category
 */
const updateCategory = (categoryId, categoryName, categoryType, status) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield _models_1.Category.findById(categoryId);
    if (!category) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: 'Category not found',
            data: null,
        };
    }
    Object.assign(category, { categoryName, categoryType, status });
    const updatedCategory = yield category.save();
    return {
        status: _constants_1.OK,
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory,
    };
});
exports.updateCategory = updateCategory;
/**
 * Delete a category
 */
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield _models_1.Category.findByIdAndDelete(categoryId);
    return {
        status: category ? _constants_1.NO_CONTENT : _constants_1.BAD_REQUEST,
        success: !!category,
        message: category ? 'Category deleted successfully' : 'Category not found',
        data: null,
    };
});
exports.deleteCategory = deleteCategory;
/**
 * Change category status
 */
const changeStatus = (categoryId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield _models_1.Category.findById(categoryId);
    if (!category) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: 'Category not found',
            data: null,
        };
    }
    category.status = status;
    yield category.save();
    return {
        status: _constants_1.OK,
        success: true,
        message: 'Category status updated successfully',
        data: category,
    };
});
exports.changeStatus = changeStatus;
//# sourceMappingURL=category.service.js.map