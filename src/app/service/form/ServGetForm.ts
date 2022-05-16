import { getCustomRepository } from 'typeorm';
import RepForm from '../../repository/form/RepForm';
import { IRequestGetForm } from '../../entity/form/Interface';

class ServGetForm {
  public async get({
    name,
    fullTimeWork,
    collage,
    english,
    availability,
    read,
    page,
    perPage,
  }: IRequestGetForm): Promise<object> {
    const repForm = getCustomRepository(RepForm);

    const result = repForm.getByFilter({
      name,
      fullTimeWork,
      collage,
      english,
      availability,
      read,
      page,
      perPage,
    });

    return result;
  }
}

export default new ServGetForm();
