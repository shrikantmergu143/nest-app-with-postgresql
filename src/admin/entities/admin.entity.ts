import { BaseEntity } from 'src/shared/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'character varying', nullable: true })
  first_name?: string;
  @Column({ type: 'character varying', nullable: true })
  last_name?: string;
  @Column({ type: 'character varying', nullable: false })
  email?: string;
  @Column({ type: 'character varying', nullable: false })
  password?: string;
}
