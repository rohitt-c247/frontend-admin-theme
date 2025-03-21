//Third-party modules
import type { NextFunction, Request, Response } from 'express';

//Middlewares
import { responseHandler } from '@middlewares';

//Utils
import { ErrorHandler, catchHandler } from '@utils';

import { FORBIDDEN, userMessages } from '@constants';
//Services
import { studentService } from '@services';

/**
 * Handles creating a new user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, phoneNumber, gender, dob, status } = req.body;
    const { status: resStatus, success, message, data } = await studentService.createStudent(name, email, password, phoneNumber, gender, dob, status);
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
 * Handles retrieving users.
 * If a userId is provided, fetch that specific user; otherwise, fetch all users.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const { page, limit, search, sortBy, orderBy } = req.query;
    const { status, success, message, data } = await studentService.getStudent(
      userId,
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
 * Handles deleting a user based on the provided user ID.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    if (userId === req?.user?.id.toString()) {
      next(new ErrorHandler(userMessages.SELF_DELETE_ERROR_MESSAGE, FORBIDDEN, null));
    }
    const { status, success, message, data } = await studentService.deleteStudent(userId);

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
 * Controller to handle updating a user's information
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const { name, email, role } = req.body;
    const { status, success, message, data } = await studentService.updateStudent(userId, name, email, role, req.body.status);

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
 * Handles user password change requests
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const setPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, password } = req.body;
    const { status, success, message, data } = await studentService.setPassword(token, password);
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
 * Handles user status change requests
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const { status, success, message, data } = await studentService.changeStatus(userId, req.body.status);

    if (success) {
      responseHandler(res, message, status, data);
    } else {
      next(new ErrorHandler(message, status, data));
    }
  } catch (error) {
    catchHandler(error, next);
  }
};
