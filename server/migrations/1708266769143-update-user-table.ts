import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1708266769143 implements MigrationInterface {
    name = 'UpdateUserTable1708266769143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "worker_userId_fkey"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "publicId" character varying`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_b4fc7927de11f45e2ecca71726b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_b4fc7927de11f45e2ecca71726b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "publicId"`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "worker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
