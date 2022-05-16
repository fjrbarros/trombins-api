import { Request, Response } from 'express';
import ServCreateForm from '../../service/form/ServCreateForm';
import ServDeleteForm from '../../service/form/ServDeleteForm';
import ServGetForm from '../../service/form/ServGetForm';
import ServUpdateForm from '../../service/form/ServUpdateForm';
import { IRequestGetForm } from '../../entity/form/Interface';

class FormController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const form = await ServCreateForm.create({
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

    return response.json(form);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const form = await ServUpdateForm.update({
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
    });

    return response.json(form);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const message = await ServDeleteForm.delete({ id });

    return response.json(message);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const {
      name,
      fullTimeWork,
      collage,
      english,
      availability,
      read,
      page,
      perPage,
    }: IRequestGetForm = request.query;

    const result = await ServGetForm.get({
      name,
      fullTimeWork,
      collage,
      english,
      availability,
      read,
      page,
      perPage,
    });

    return response.json(result);
  }
}

export default new FormController();
