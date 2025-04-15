import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  table_number: number;

  @Column({ type: 'int' })
  capacity: number;
}