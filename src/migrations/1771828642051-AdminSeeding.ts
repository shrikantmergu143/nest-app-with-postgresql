import { readFileSync } from 'fs';
import { join } from 'path';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminSeeding1771828642051 implements MigrationInterface {
  name = 'AdminSeeding1771828642051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_user_type_enum" AS ENUM('admin', 'user', 'employee')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_employee_type_enum" AS ENUM('Permanent', 'Contract')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'deactive')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying, "frist_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying, "profile" json, "user_type" "public"."users_user_type_enum" NOT NULL DEFAULT 'employee', "employee_type" "public"."users_employee_type_enum" DEFAULT 'Permanent', "company" character varying NOT NULL, "status" "public"."users_status_enum" NOT NULL DEFAULT 'active', "dob" date, "gender" "public"."users_gender_enum", "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "is_deactivete" boolean NOT NULL DEFAULT false, "present_address" character varying, "parament_address" character varying, "user_designation" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "first_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    const filePath = join(
      __dirname,
      '../../shared/scripts/data-load/admin.sql',
    );

    const sql = readFileSync(filePath, 'utf8');

    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_employee_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_user_type_enum"`);
  }
}
