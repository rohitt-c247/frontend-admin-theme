//Third-party modules
import type { NextFunction, Request, Response } from 'express';

//Middlewares
import { responseHandler } from '@middlewares';

//Utils
import { ErrorHandler, catchHandler } from '@utils';

//Constants
//import { FORBIDDEN, categoryMessages } from '@constants';

//Services
import { categoryService } from '@services';

/**
 * Handles creating a new category
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, status, createdBy } = req.body;
    const { status: resStatus, success, message, data } = await categoryService.createCategory(name, description, status, createdBy);
    if (success) {
      responseHandler(res, message, resStatus, data);
    } else {
      next(new ErrorHandler(message, resStatus, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles retrieving categories.
 * If a categoryId is provided, fetch that specific category; otherwise, fetch all categories.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { page, limit, search, sortBy, orderBy } = req.query;
    const { status, success, message, data } = await categoryService.getCategory(
      categoryId,
      Number(page),
      Number(limit),
      search,
      sortBy,
      orderBy,
    );
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles updating a category's information
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { name, description, status } = req.body;
    const { status: resStatus, success, message, data } = await categoryService.updateCategory(categoryId, name, description, status);
    if (success) {
      responseHandler(res, message, resStatus, data);
    } else {
      next(new ErrorHandler(message, resStatus, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles deleting a category based on the provided category ID.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { status, success, message, data } = await categoryService.deleteCategory(categoryId);
    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

/**
 * Handles category status change requests
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { status, success, message, data } = await categoryService.changeStatus(categoryId, req.body.status);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};