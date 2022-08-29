import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable implements MigrationInterface {
  name = 'userTable';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "TB_USER_SERVICE" ("id" SERIAL NOT NULL, "last_login" TIMESTAMP NOT NULL, "is_superuser" boolean NOT NULL, "is_staff" boolean NOT NULL, "date_joined" TIMESTAMP NOT NULL, CONSTRAINT "PK_33e66f499e61f8af056c48235b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "TB_USER" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_0bbd1d907d22b361c4ca42b68c5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "TB_USER"`);
    await queryRunner.query(`DROP TABLE "TB_USER_SERVICE"`);
  }
}
