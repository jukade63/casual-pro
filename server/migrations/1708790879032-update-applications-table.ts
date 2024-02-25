import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateApplicationsTable1708790879032 implements MigrationInterface {
    name = 'UpdateApplicationsTable1708790879032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
