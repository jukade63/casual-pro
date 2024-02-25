import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostjobCol1708764618649 implements MigrationInterface {
    name = 'UpdatePostjobCol1708764618649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_post" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_post" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
