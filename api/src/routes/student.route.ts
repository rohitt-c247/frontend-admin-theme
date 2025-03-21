//Controllers
import { studentController } from '@controllers';
//Enums
import { Role } from '@enums';
//Middlewares
import { authenticate, authorize, validate } from '@middlewares';
//Validations
import { studentValidations } from '@validations';
//Third-party modules
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(Role.Admin),
  validate(studentValidations.createStudentSchema),
  studentController.createStudent,
);

router.get('/:userId?', authenticate, authorize(Role.Admin), studentController.getStudent);
router.delete('/:userId', authenticate, authorize(Role.Admin), studentController.deleteStudent);

router.put(
  '/:userId',
  authenticate,
  authorize(Role.Admin),
  validate(studentValidations.updateStudentSchema),
  studentController.updateStudent,
);
router.put(
  '/change-status/:userId',
  authenticate,
  authorize(Role.Admin),
  validate(studentValidations.changeStatusSchema),
  studentController.changeStatus,
);

router.post('/set-password', validate(studentValidations.setPasswordSchema), studentController.setPassword);

export default router;
