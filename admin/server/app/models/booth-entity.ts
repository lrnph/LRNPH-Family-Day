import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'booth' })
export class Booth {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'booth_name', type: 'varchar', length: 50 })
  booth_name!: string;

  @Column({ name: 'is_active', type: 'bit' })
  is_active!: boolean;

}
