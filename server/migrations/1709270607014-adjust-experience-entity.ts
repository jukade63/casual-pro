import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustExperienceEntity1709270607014 implements MigrationInterface {
    name = 'AdjustExperienceEntity1709270607014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "jobType"`);
        await queryRunner.query(`DROP TYPE "public"."experience_jobtype_enum"`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "position" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "company" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "position"`);
        await queryRunner.query(`CREATE TYPE "public"."experience_jobtype_enum" AS ENUM('full-time', 'part-time', 'temporary')`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "jobType" "public"."experience_jobtype_enum" NOT NULL`);
    }

}
