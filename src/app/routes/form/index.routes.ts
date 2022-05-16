import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthMiddleware from '../../../middlewares/AuthMiddleware';
import FormController from '../../controller/form/FormController';

const formRouter = Router();

const deleteUuid = { id: Joi.string().uuid().required() };
const postData = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  pps: Joi.string().required(),
  fullTimeWork: Joi.boolean().required(),
  collage: Joi.boolean().required(),
  english: Joi.string().required(),
  availability: Joi.string().required(),
  safePass: Joi.boolean().required(),
  bankAccount: Joi.string().required(),
  email: Joi.string().email().required(),
  telephone: Joi.string().required(),
  addres: Joi.string().required(),
  aboutUser: Joi.string(),
  citizenship: Joi.string().required(),
  read: Joi.boolean(),
  user: Joi.object({ id: Joi.string().uuid().required() }).required(),
};

const putData = {
  ...deleteUuid,
  ...postData,
};

formRouter.post(
  '/',
  celebrate({ [Segments.BODY]: postData }),
  FormController.create,
);

formRouter.put(
  '/',
  AuthMiddleware,
  celebrate({ [Segments.BODY]: putData }),
  FormController.update,
);

formRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: deleteUuid }),
  AuthMiddleware,
  FormController.delete,
);

formRouter.get('/', FormController.get);

export default formRouter;
