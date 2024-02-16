import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEducationtTable1708066289365 implements MigrationInterface {
    name = 'UpdateEducationtTable1708066289365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "education" RENAME COLUMN "grad_date" TO "gradDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "education" RENAME COLUMN "gradDate" TO "grad_date"`);
    }

}
