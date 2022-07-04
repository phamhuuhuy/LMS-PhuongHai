import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lab {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'lab_name' })
  @IsString()
  labName: string;

  @Column({ name: 'sub_lab' })
  @IsString()
  subLab: string;

  @Column({ name: 'certification' })
  @IsString()
  certification: string;
}
