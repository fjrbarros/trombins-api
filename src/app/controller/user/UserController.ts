import { Request, Response } from 'express';
import ServUpdateUser from '../../service/user/ServUpdateUser';
import ServAuthUser from '../../service/user/ServAuthUser';
import ServUploadAvatarUser from '../../service/user/ServUploadAvatarUser';

class UserController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id, email, oldPassword, newPassword, name, administrator } =
      request.body;

    const user = await ServUpdateUser.update({
      id,
      email,
      oldPassword,
      newPassword,
      name,
      administrator,
    });

    return response.json(user);
  }

  async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await ServAuthUser.auth({ email, password });

    return response.json(user);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { userId } = request;

    const user = await ServAuthUser.getById({ userId });

    return response.json(user);
  }

  async uploadAvatarUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user = await ServUploadAvatarUser.uploadAvatar({
      userId: request.userId,
      avatarFileName: request.file?.filename || '',
    });

    return response.json(user);
  }
}

export default new UserController();
