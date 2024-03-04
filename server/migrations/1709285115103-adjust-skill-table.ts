import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustSkillTable1709285115103 implements MigrationInterface {
    name = 'AdjustSkillTable1709285115103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skills" DROP COLUMN "skill_name"`);
        await queryRunner.query(`ALTER TABLE "skills" DROP COLUMN "cert_link"`);
        await queryRunner.query(`ALTER TABLE "skills" ADD "skillName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skills" ADD "certLink" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      
    }

}
