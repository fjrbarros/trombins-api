import { getCustomRepository } from 'typeorm';
import AppError from '../../../error/AppError';
import RepUser from '../../repository/user/RepUser';
import path from 'path';
import uploadConfig from '../../../config/upload';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class ServUploadAvatarUser {
  public async uploadAvatar({
    userId,
    avatarFileName,
  }: IRequest): Promise<string> {
    const repUser = getCustomRepository(RepUser);

    const user = await repUser.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarFileExists = await fs.promises.stat(avatarFilePath);

      if (avatarFileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    const userUpdate = await repUser.save(user);

    return userUpdate?.avatar;
  }
}

export default new ServUploadAvatarUser();
