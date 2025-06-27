import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity({ name: 'claim' })
export class Claim {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'employee_id' })
  employee_id!: string;

  @Column({ name: 'booth_id' })
  booth_id!: number;

  @Column()
  booth_name!: string;

  @Column()
  department!: string;

  @Column()
  first_name!: string;

  @Column()
  middle_name!: string;

  @Column()
  last_name!: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
