import { getCustomRepository } from 'typeorm';
import RepForm from '../../repository/form/RepForm';
import Form from '../../entity/form/Form';
import { EnglishLevel, AvailabilityDayWeek } from '../../entity/form/Enums';
import User from '../../entity/user/User';

interface IRequest {
  name: string;
  age: number;
  pps: string;
  fullTimeWork: boolean;
  collage: boolean;
  english: EnglishLevel;
  availability: AvailabilityDayWeek;
  safePass: boolean;
  bankAccount: string;
  email: string;
  telephone: string;
  addres: string;
  aboutUser: string;
  citizenship: string;
  read: boolean;
  user: User;
}

class SerCreateForm {
  public async create({
    name,
    age,
    pps,
    fullTimeWork,
    collage,
    english,
    availability,
    safePass,
    bankAccount,
    email,
    telephone,
    addres,
    aboutUser,
    citizenship,
    read,
    user,
  }: IRequest): Promise<Form | undefined> {
    const repForm = getCustomRepository(RepForm);

    const form = repForm.create({
      name,
      age,
      pps,
      fullTimeWork,
      collage,
      english,
      availability,
      safePass,
      bankAccount,
      email,
      telephone,
      addres,
      aboutUser,
      citizenship,
      read,
      user,
    });

    await repForm.save(form);

    return form;
  }
}

export default new SerCreateForm();
