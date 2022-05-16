import { EntityRepository, Repository } from 'typeorm';
import Form from '../../entity/form/Form';
import { IRequestGetForm } from '../../entity/form/Interface';

@EntityRepository(Form)
class RepForm extends Repository<Form> {
  public async findById(id: string): Promise<Form | undefined> {
    const form = await this.findOne({
      where: {
        id,
      },
    });

    return form;
  }

  public async findByEmail(email: string): Promise<Form | undefined> {
    const form = await this.findOne({
      where: {
        email,
      },
    });

    return form;
  }

  public async getByFilter({
    name,
    fullTimeWork,
    collage,
    english,
    availability,
    read,
    page,
    perPage,
  }: IRequestGetForm): Promise<object> {
    const builder = this.createQueryBuilder('form');

    let sql = '';
    let properties = {};

    if (name) {
      sql += 'LOWER(form.name) LIKE :name';
      properties = { ...properties, name: `%${name.toLowerCase()}%` };
    }

    if (fullTimeWork) {
      sql += sql.length
        ? ' AND form.fullTimeWork = :fullTimeWork'
        : 'form.fullTimeWork = :fullTimeWork';
      properties = { ...properties, fullTimeWork };
    }

    if (collage) {
      sql += sql.length
        ? ' AND form.collage = :collage'
        : 'form.collage = :collage';
      properties = { ...properties, collage };
    }

    if (english) {
      sql += sql.length
        ? ' AND UPPER(form.english) = :english'
        : 'UPPER(form.english) = :english';
      properties = { ...properties, english: english.toUpperCase() };
    }

    if (availability) {
      sql += sql.length
        ? ' AND UPPER(form.availability) = :availability'
        : 'UPPER(form.availability) = :availability';
      properties = { ...properties, availability: availability.toUpperCase() };
    }

    if (read) {
      sql += sql.length ? ' AND form.read = :read' : 'form.read = :read';
      properties = { ...properties, read };
    }

    builder.where(sql, properties);

    const _page: number = parseInt(page as any) || 1;
    const _perPage: number = parseInt(perPage as any) || 10;
    const _total = await builder.getCount();

    builder.offset((_page - 1) * _perPage).limit(_perPage);

    const data = await builder.getMany();

    const result = {
      data,
      _total,
      _page,
      _last_page: Math.ceil(_total / _perPage),
    };

    return result;
  }
}

export default RepForm;
