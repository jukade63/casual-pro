import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillTbColumn1709290560208 implements MigrationInterface {
    name = 'AddSkillTbColumn1709290560208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skills" ADD "skillLevel" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      
    }

}
