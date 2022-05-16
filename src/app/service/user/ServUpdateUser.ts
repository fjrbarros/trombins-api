import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../error/AppError';
import User from '../../entity/user/User';
import RepUser from '../../repository/user/RepUser';
import bcrypt from 'bcryptjs';

interface IRequest {
  id: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  name: string;
  administrator: boolean;
}

class ServUpdateUser {
  public async update({
    id,
    email,
    oldPassword,
    newPassword,
    name,
    administrator = false,
  }: IRequest): Promise<User | undefined> {
    const repUser = getCustomRepository(RepUser);

    const existsUserEmail = await repUser.findByEmail(email);

    if (existsUserEmail && existsUserEmail.id !== id) {
      throw new AppError('E-mail already registered!');
    }

    const user = await repUser.findById(id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidPassword) {
      throw new AppError('Old password does not match!');
    }

    const _newPassword = await hash(newPassword, 8);

    user.email = email;
    user.password = _newPassword;
    user.name = name;
    user.administrator = administrator;

    await repUser.save(user);

    user.password = '';

    return user;
  }
}

export default new ServUpdateUser();
