//Controllers
import { categoryController } from '@controllers';
//Enums
import { Role } from '@enums';
//Middlewares
import { authenticate, authorize, validate } from '@middlewares';
//Validations
import { categoryValidations } from '@validations';
//Third-party modules
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(Role.Admin),
  validate(categoryValidations.createCategorySchema),
  categoryController.createCategory,
);

router.get('/:categoryId?', authenticate, authorize(Role.Admin), categoryController.getCategory);
router.delete('/:categoryId', authenticate, authorize(Role.Admin), categoryController.deleteCategory);

router.put(
  '/:categoryId',
  authenticate,
  authorize(Role.Admin),
  validate(categoryValidations.updateCategorySchema),
  categoryController.updateCategory,
);
router.put(
  '/change-status/:categoryId',
  authenticate,
  authorize(Role.Admin),
  validate(categoryValidations.changeStatusSchema),
  categoryController.changeStatus,
);

export default router;