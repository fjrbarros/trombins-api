import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../../controller/user/UserController';
import AuthMiddleware from '../../../middlewares/AuthMiddleware';
import multer from 'multer';
import uploadConfig from '../../../config/upload';

const upload = multer(uploadConfig);

const userRouter = Router();

userRouter.post(
  '/auth',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.auth,
);

userRouter.get('/', AuthMiddleware, UserController.getById);

userRouter.put(
  '/',
  AuthMiddleware,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  UserController.update,
);

userRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  UserController.uploadAvatarUser,
);

export default userRouter;
