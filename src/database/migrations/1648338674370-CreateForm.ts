import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateForm1648338674370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'form',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'pps',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'fullTimeWork',
            type: 'boolean',
          },
          {
            name: 'collage',
            type: 'boolean',
          },
          {
            name: 'english',
            type: 'varchar',
          },
          {
            name: 'availability',
            type: 'varchar',
          },
          {
            name: 'safePass',
            type: 'boolean',
          },
          {
            name: 'bankAccount',
            type: 'varchar',
          },

          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'telephone',
            type: 'varchar',
          },
          {
            name: 'addres',
            type: 'varchar',
          },
          {
            name: 'aboutUser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'citizenship',
            type: 'varchar',
          },
          {
            name: 'read',
            type: 'boolean',
            default: false,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('form');
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
