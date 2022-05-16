import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Form from '../form/Form';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column('boolean')
  administrator: boolean;

  @Column()
  avatar: string;

  @OneToMany(() => Form, form => form.user)
  form: Form[];
}

export default User;
