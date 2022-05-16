import { getCustomRepository } from 'typeorm';
import RepForm from '../../repository/form/RepForm';
import Form from '../../entity/form/Form';
import { EnglishLevel, AvailabilityDayWeek } from '../../entity/form/Enums';
import AppError from '../../../error/AppError';

interface IRequest {
  id: string;
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
}

class ServUpdateForm {
  public async update({
    id,
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
  }: IRequest): Promise<Form | undefined> {
    const repForm = getCustomRepository(RepForm);

    const form = await repForm.findById(id);

    if (!form) {
      throw new AppError('Form does not exists!');
    }

    (form.name = name),
      (form.age = age),
      (form.pps = pps),
      (form.fullTimeWork = fullTimeWork),
      (form.collage = collage),
      (form.english = english),
      (form.availability = availability),
      (form.safePass = safePass),
      (form.bankAccount = bankAccount),
      (form.email = email),
      (form.telephone = telephone),
      (form.addres = addres),
      (form.aboutUser = aboutUser),
      (form.citizenship = citizenship),
      await repForm.save(form);

    return form;
  }
}

export default new ServUpdateForm();
