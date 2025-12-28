import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class LoadAdminData1766935542347 implements MigrationInterface {
  name = 'LoadAdminData1766935542347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Create tables
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "name" character varying,
        "frist_name" character varying,
        "last_name" character varying,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "phone_number" character varying,
        "profile" json,
        "user_type" "public"."users_user_type_enum" NOT NULL DEFAULT 'employee',
        "employee_type" "public"."users_employee_type_enum" DEFAULT 'Permanent',
        "company" character varying NOT NULL,
        "status" "public"."users_status_enum" NOT NULL DEFAULT 'active',
        "dob" date,
        "gender" "public"."users_gender_enum",
        "is_active" boolean NOT NULL DEFAULT true,
        "is_deleted" boolean NOT NULL DEFAULT false,
        "is_deactivete" boolean NOT NULL DEFAULT false,
        "present_address" character varying,
        "parament_address" character varying,
        "user_designation" character varying,
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "admin" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "first_name" character varying,
        "last_name" character varying,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        CONSTRAINT "PK_admin_id" PRIMARY KEY ("id")
      )
    `);

    // 2️⃣ Run admin.sql AFTER tables exist
    const sqlFilePath = path.join(
      process.cwd(), // project root
      'src',
      'shared',
      'scripts',
      'data-load',
      'admin.sql',
    );

    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Optional rollback for seeded data
    await queryRunner.query(`DELETE FROM admin`);
    await queryRunner.query(`DELETE FROM users WHERE user_type = 'admin'`);

    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
