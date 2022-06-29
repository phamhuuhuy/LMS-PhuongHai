import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lab {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'lab_name' })
  @IsString()
  labName: string;
}
