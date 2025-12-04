import { BaseEntity } from 'src/shared/entity/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'character varying', nullable: true })
  name?: string;

  @Column({ type: 'character varying', nullable: true })
  frist_name?: string;

  @Column({ type: 'character varying', nullable: true })
  last_name?: string;

  @Column({ type: 'character varying', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true, type: 'json' })
  profile?: string;

  @Column({
    type: 'enum',
    default: 'employee',
    enum: ['admin', 'user', 'employee'],
  })
  user_type: 'admin' | 'user' | 'employee';

  @Column({
    type: 'enum',
    default: 'Permanent',
    enum: ['Permanent', 'Contract'],
    nullable: true,
  })
  employee_type: 'Permanent' | 'Contract';

  @Column()
  company: string;

  @Column({
    type: 'enum',
    enum: ['active', 'deactive'],
    default: 'active',
  })
  status: 'active' | 'deactive';

  @Column({ type: 'date', nullable: true })
  dob?: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    nullable: true,
  })
  gender?: 'male' | 'female';

  @Column({ default: true })
  is_active?: boolean;

  @Column({ default: false })
  is_deleted?: boolean;

  @Column({ default: false })
  is_deactivete?: boolean;

  @Column({ nullable: true })
  present_address: string;

  @Column({ nullable: true })
  parament_address: string;

  @Column({ nullable: true })
  user_designation: string;
}
