import { EntityRepository, Repository } from 'typeorm';
import User from '../../entity/user/User';

@EntityRepository(User)
class RepUser extends Repository<User> {
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default RepUser;
