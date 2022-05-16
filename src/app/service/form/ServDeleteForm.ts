import { getCustomRepository } from 'typeorm';
import RepForm from '../../repository/form/RepForm';
import AppError from '../../../error/AppError';

interface IRequest {
  id: string;
}

class ServDeleteForm {
  public async delete({ id }: IRequest): Promise<string> {
    const repForm = getCustomRepository(RepForm);
    const form = await repForm.findOne(id);

    if (!form) {
      throw new AppError('Form not found!');
    }

    await repForm.remove(form);

    return 'Record deleted successfully!';
  }
}

export default new ServDeleteForm();
