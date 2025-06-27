import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';

@Entity({ name: 'registration' })

export class Registration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  employee_id!: string;

  @Column()
  department!: string;

  @Column()
  invited_guests!: number;

  @Column()
  first_name!: string;

  @Column()
  middle_name!: string;

  @Column()
  last_name!: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
