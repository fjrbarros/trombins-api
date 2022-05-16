import { getCustomRepository } from 'typeorm';
import AppError from '../../../error/AppError';
import User from '../../entity/user/User';
import RepUser from '../../repository/user/RepUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IRequestAuth {
  email: string;
  password: string;
}

interface IResponseAuth {
  user: User;
  token: string;
}

interface IRequestUserId {
  userId: string;
}

interface IRespUser {
  administrator: boolean;
  avatar: string;
  email: string;
  id: string;
  name: string;
}

class ServAuthUser {
  public async auth({ email, password }: IRequestAuth): Promise<IResponseAuth> {
    const repUser = getCustomRepository(RepUser);

    const user = await repUser.findByEmail(email);

    if (!user) {
      throw new AppError('User not registered!', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Password does not match!');
    }

    const token = jwt.sign({ id: user.id }, 'secret', {
      expiresIn: '1d',
    });

    user.password = '';

    return { user, token };
  }

  public async getById({ userId }: IRequestUserId): Promise<IRespUser> {
    const repUser = getCustomRepository(RepUser);
    const user = await repUser.findById(userId);

    if (!user) {
      throw new AppError('User not found!');
    }

    const resp: IRespUser = {
      administrator: user.administrator,
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      name: user.name,
    };

    return resp;
  }
}

export default new ServAuthUser();
