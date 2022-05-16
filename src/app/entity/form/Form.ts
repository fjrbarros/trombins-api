import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../user/User';
import { EnglishLevel, AvailabilityDayWeek } from './Enums';

@Entity('form')
class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  age: number;

  @Column()
  pps: string;

  @Column('boolean')
  fullTimeWork: boolean;

  @Column('boolean')
  collage: boolean;

  @Column({
    type: 'enum',
    enum: EnglishLevel,
    default: EnglishLevel.intermediary,
  })
  english: EnglishLevel;

  @Column({
    type: 'enum',
    enum: AvailabilityDayWeek,
    default: AvailabilityDayWeek.allDays,
  })
  availability: AvailabilityDayWeek;

  @Column('boolean')
  safePass: boolean;

  @Column()
  bankAccount: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  addres: string;

  @Column()
  aboutUser: string;

  @Column()
  citizenship: string;

  @Column('boolean')
  read: boolean;

  @ManyToOne(() => User, user => user.form)
  @JoinColumn({ name: 'userId' })
  user: User;
}

export default Form;
