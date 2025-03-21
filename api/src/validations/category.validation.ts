//Third-party modules
import Joi from 'joi';

//Constants
import { commonMessages, commonVariables } from '@constants';

export const createCategorySchema = {
  body: Joi.object({
    categoryName: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .required(),
    categoryType: Joi.string()
      .required(),
    status: Joi.number()
      .integer()
      .valid(0, 1)  // Using direct status values instead of UserStatus enum
      .default(1)
      .required(),
  }),
};

export const updateCategorySchema = {
  params: Joi.object({
    categoryId: Joi.number().integer().required(),
  }),
  body: Joi.object({
    categoryName: Joi.string()
      .max(commonVariables.MAX_CHARACTERS_LENGTH)
      .optional(),
    categoryType: Joi.string()
      .optional(),
    status: Joi.number()
      .integer()
      .valid(0, 1)  // Using direct status values
      .optional(),
  }),
};

export const deleteCategorySchema = {
  params: Joi.object({
    categoryId: Joi.number().integer().required(),
  }),
};

export const getCategoryByIdSchema = {
  params: Joi.object({
    categoryId: Joi.number().integer().required(),
  }),
};

export const changeStatusSchema = {
  params: Joi.object({
    categoryId: Joi.number().integer().required(),
  }),
  body: Joi.object({
    status: Joi.number().integer().valid(0, 1).required(),  // Using direct status values instead of UserStatus
  }),
};