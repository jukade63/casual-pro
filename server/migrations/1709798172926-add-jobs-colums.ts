import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJobsColums1709798172926 implements MigrationInterface {
    name = 'AddJobsColums1709798172926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ADD "isFavorite" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
