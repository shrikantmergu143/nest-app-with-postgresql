import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1763482708810 implements MigrationInterface {
    name = 'Generate1763482708810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_user_type_enum" AS ENUM('admin', 'user', 'employee')`);
        await queryRunner.query(`CREATE TYPE "public"."users_employee_type_enum" AS ENUM('Permanent', 'Contract')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'deactive')`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "frist_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying, "profile" json, "user_type" "public"."users_user_type_enum" NOT NULL, "employee_type" "public"."users_employee_type_enum", "company" character varying NOT NULL, "status" "public"."users_status_enum" NOT NULL DEFAULT 'active', "dob" date, "gender" "public"."users_gender_enum", "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "is_deactivete" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP DEFAULT now(), "present_address" character varying, "parament_address" character varying, "user_designation" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_employee_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_type_enum"`);
    }

}
