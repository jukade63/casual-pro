import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustStatusEnum1709623095800 implements MigrationInterface {
    name = 'AdjustStatusEnum1709623095800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "worker_userId_fkey"`);
        await queryRunner.query(`ALTER TYPE "public"."applications_status_enum" RENAME TO "applications_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."applications_status_enum" AS ENUM('applying', 'accepted', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "status" TYPE "public"."applications_status_enum" USING "status"::"text"::"public"."applications_status_enum"`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "status" SET DEFAULT 'applying'`);
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_b4fc7927de11f45e2ecca71726b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
    }

}
