import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'character varying', nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ type: 'character varying', nullable: true })
  frist_name?: string;

  @Field({ nullable: true })
  @Column({ type: 'character varying', nullable: true })
  last_name?: string;

  @Field()
  @Column({ type: 'character varying', unique: true })
  email: string;

  @Exclude() // This decorator marks the field to be excluded during serialization
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone_number?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'json' })
  profile?: string;

  @Field()
  @Column({
    type: 'enum',
    default: 'employee',
    enum: ['admin', 'user', 'employee'],
  })
  user_type: 'admin' | 'user' | 'employee';

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    default: 'Permanent',
    enum: ['Permanent', 'Contract'],
    nullable: true,
  })
  employee_type: 'Permanent' | 'Contract';

  @Field()
  @Column()
  company: string;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: ['active', 'deactive'],
    default: 'active',
  })
  status: 'active' | 'deactive';

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  dob?: string;

  @Field({ nullable: true })
  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    nullable: true,
  })
  gender?: 'male' | 'female';

  @Field({ nullable: true })
  @Column({ default: true })
  is_active?: boolean;

  @Field({ nullable: true })
  @Column({ default: false })
  is_deleted?: boolean;

  @Field({ nullable: true })
  @Column({ default: false })
  is_deactivete?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  present_address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  parament_address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  user_designation: string;
}
